// HISTADA – Cloudflare Pages Function: Społecznościowy Serwer Multiplayer, Czat Audio i Tekstowy
// Obsługuje pokoje graczy, obecność na żywo, czat tekstowy, wiadomości głosowe audio oraz sygnalizację WebRTC dla czatu głosowego.

// Globalny magazyn w pamięci instancji Cloudflare Edge
const ROOMS = new Map();
const LEADERBOARD = new Map();

const PEER_TIMEOUT_MS = 25000; // 25 sekund bez heartbeat = offline
const MAX_MESSAGES_PER_ROOM = 150;
const MAX_AUDIO_B64_BYTES = 500000; // ~370 KB na notatkę głosową

function getRoom(roomId = 'histada-global') {
  const rId = String(roomId || 'histada-global').toLowerCase().trim().slice(0, 40) || 'histada-global';
  if (!ROOMS.has(rId)) {
    ROOMS.set(rId, {
      id: rId,
      peers: new Map(),
      messages: [],
      signals: [],
      events: [],
      created: Date.now()
    });
  }
  return ROOMS.get(rId);
}

function pruneRoom(room) {
  const now = Date.now();
  // Usuń nieaktywnych graczy
  for (const [peerId, peer] of room.peers.entries()) {
    if (now - (peer.lastSeen || 0) > PEER_TIMEOUT_MS) {
      room.peers.delete(peerId);
      room.events.push({
        type: 'left',
        peerId,
        name: peer.name || 'Gracz',
        ts: now
      });
    }
  }
  // Przytnij stare sygnały WebRTC (> 60s)
  room.signals = room.signals.filter(s => now - s.ts < 60000);
  // Przytnij stare zdarzenia (> 60s)
  room.events = room.events.filter(e => now - e.ts < 60000);
  // Przytnij wiadomości
  if (room.messages.length > MAX_MESSAGES_PER_ROOM) {
    room.messages = room.messages.slice(-MAX_MESSAGES_PER_ROOM);
  }
}

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-histada-peer',
    'cache-control': 'no-store, no-cache, must-revalidate'
  }
});

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'content-type, x-histada-peer'
    }
  });
}

// GET: Pobierz stan pokoju (obecni gracze, wiadomości czatu, zdarzenia)
export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get('room') || 'histada-global';
  const since = parseInt(url.searchParams.get('since') || '0', 10);
  const peerId = url.searchParams.get('peerId') || '';

  const room = getRoom(roomId);
  pruneRoom(room);

  // Odśwież lastSeen gracza pytającego
  if (peerId && room.peers.has(peerId)) {
    const p = room.peers.get(peerId);
    p.lastSeen = Date.now();
  }

  const peersList = Array.from(room.peers.values()).map(p => ({
    peer: p.id,
    id: p.id,
    name: p.name,
    char: p.char,
    scene: p.scene,
    x: p.x,
    y: p.y,
    color: p.color,
    score: p.score || 0,
    presence: p.presence || {},
    speaking: !!p.speaking,
    lastSeen: p.lastSeen
  }));

  const messages = room.messages.filter(m => m.ts > since);
  const events = room.events.filter(e => e.ts > since && (!e.targetPeer || e.targetPeer === peerId));
  const signals = room.signals.filter(s => s.ts > since && (!s.toPeer || s.toPeer === peerId) && s.fromPeer !== peerId);

  // Top 50 z rankingu
  const rank = Array.from(LEADERBOARD.values())
    .sort((a, b) => (b.total || 0) - (a.total || 0))
    .slice(0, 50);

  return json({
    ok: true,
    room: roomId,
    peers: peersList,
    messages,
    events,
    signals,
    leaderboard: rank,
    serverTime: Date.now()
  });
}

// POST: Akcje gracza (join, presence, chat, audio, wave, WebRTC signal)
export async function onRequestPost({ request }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Nieprawidłowy JSON' }, 400);
  }

  const {
    action = 'heartbeat',
    roomId = 'histada-global',
    peerId,
    name = 'Podróżnik',
    presence = {},
    chat = null,
    audio = null,
    signal = null,
    event = null,
    playerProfile = null
  } = body || {};

  if (!peerId) {
    return json({ error: 'Brak identyfikatora peerId' }, 400);
  }

  const room = getRoom(roomId);
  pruneRoom(room);
  const now = Date.now();

  // 1. Zarejestruj / zaktualizuj obecność gracza
  let peer = room.peers.get(peerId);
  if (!peer) {
    peer = {
      id: peerId,
      name: String(name || 'Podróżnik').slice(0, 32),
      char: presence.c || 0,
      scene: presence.s || 'map',
      x: presence.x || 500,
      y: presence.y || 400,
      color: presence.color || '#d9b25a',
      score: presence.score || 0,
      presence,
      speaking: !!presence.speaking,
      joinedAt: now,
      lastSeen: now
    };
    room.peers.set(peerId, peer);

    room.events.push({
      type: 'joined',
      peerId,
      name: peer.name,
      char: peer.char,
      ts: now
    });
  } else {
    peer.name = String(name || peer.name).slice(0, 32);
    peer.lastSeen = now;
    if (presence.s) peer.scene = presence.s;
    if (presence.x != null) peer.x = presence.x;
    if (presence.y != null) peer.y = presence.y;
    if (presence.c != null) peer.char = presence.c;
    if (presence.score != null) peer.score = presence.score;
    if (presence.speaking != null) peer.speaking = !!presence.speaking;
    peer.presence = Object.assign(peer.presence || {}, presence);
  }

  // 2. Obsługa wiadomości tekstowej i audio w czacie
  if (chat) {
    const text = String(chat.text || chat.t || '').trim().slice(0, 400);
    const audioData = (chat.audioData || chat.audio) ? String(chat.audioData || chat.audio).slice(0, MAX_AUDIO_B64_BYTES) : null;
    const duration = parseFloat(chat.duration) || 0;
    const scope = (chat.scope === 'all') ? 'all' : 'here';
    const scene = String(chat.scene || chat.s || peer.scene || 'map');

    if (text || audioData) {
      const msgObj = {
        id: `msg_${now}_${Math.random().toString(36).substring(2, 7)}`,
        room: roomId,
        peerId,
        name: peer.name,
        col: chat.col || peer.color || '#d9b25a',
        char: peer.char,
        text: text,
        audioData: audioData,
        duration: duration,
        scope,
        scene,
        ts: now,
        at: new Date(now).toTimeString().slice(0, 5)
      };
      room.messages.push(msgObj);
      if (room.messages.length > MAX_MESSAGES_PER_ROOM) {
        room.messages.shift();
      }
    }
  }

  // 3. Sygnalizacja WebRTC do czatu głosowego na żywo (Live Voice Call)
  if (signal && signal.data) {
    room.signals.push({
      fromPeer: peerId,
      toPeer: signal.toPeer || null,
      data: signal.data,
      type: signal.type || 'webrtc',
      ts: now
    });
  }

  // 4. Zdarzenia gry (pomachanie, rzut kośćmi, quiz)
  if (event) {
    room.events.push({
      type: event.type || 'game',
      fromPeer: peerId,
      targetPeer: event.targetPeer || null,
      data: event.data || {},
      ts: now
    });
  }

  // 5. Zapis profilu i punktów w rankingu
  if (playerProfile) {
    LEADERBOARD.set(peerId, {
      id: peerId,
      name: playerProfile.name || peer.name,
      char: playerProfile.char != null ? playerProfile.char : peer.char,
      total: playerProfile.total || 0,
      scores: playerProfile.scores || {},
      ach: playerProfile.ach || [],
      updated: now
    });
  }

  return json({
    ok: true,
    room: roomId,
    myPeerId: peerId,
    activePeersCount: room.peers.size,
    ts: now
  });
}
