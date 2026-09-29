/* =========================================================================
 * HISTADA NETWORK & SOCIAL MULTIPLAYER ENGINE
 * Pokoje online, synchronizacja graczy w czasie rzeczywistym,
 * czat tekstowy, nagrania głosowe audio (MediaRecorder) oraz
 * czat głosowy na żywo (WebRTC Voice Mesh).
 * ========================================================================= */

(function () {
  'use strict';

  // 1. Unikatowy identyfikator gracza
  function getMyId() {
    try {
      let id = localStorage.getItem('histada.peerId');
      if (!id) {
        id = 'p_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
        localStorage.setItem('histada.peerId', id);
      }
      return id;
    } catch (e) {
      return 'p_' + Math.random().toString(36).substring(2, 9);
    }
  }

  function getMyName() {
    try {
      return localStorage.getItem('histada.playerName') || '';
    } catch (e) {
      return '';
    }
  }

  function setMyName(n) {
    try {
      localStorage.setItem('histada.playerName', n);
    } catch (e) {}
  }

  function getInitialRoom() {
    try {
      const q = new URLSearchParams(window.location.search).get('room');
      if (q) return q.toLowerCase().trim();
      return localStorage.getItem('histada.roomId') || 'histada-global';
    } catch (e) {
      return 'histada-global';
    }
  }

  // Klasa silnika sieciowego HISTADA
  class HistadaNetworkEngine {
    constructor() {
      this.myId = getMyId();
      this.myName = getMyName() || 'Podróżnik';
      this.roomId = getInitialRoom();
      this.apiEndpoint = '/api/multiplayer';
      this.isConnected = false;
      this.lastPollTs = 0;
      this.peers = [];
      this.messages = [];
      this.listeners = {
        peers: [],
        chat: [],
        wave: [],
        connection: [],
        game: [],
        voice: []
      };

      // Stan głosu i mikrofonu
      this.isVoiceJoined = false;
      this.isMicMuted = true;
      this.isDeafened = false;
      this.localMediaStream = null;
      this.mediaRecorder = null;
      this.audioChunks = [];
      this.isRecordingAudioMsg = false;
      this.recordStartTime = 0;
      this.audioAnalyser = null;
      this.audioContext = null;
      this.isSpeaking = false;

      // WebRTC Peer Connections dla Voice Chat
      this.peerConnections = new Map(); // peerId -> RTCPeerConnection
      this.rtcConfig = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      };

      // Lokalny BroadcastChannel dla zakładek w tej samej przeglądarce
      this.broadcastChannel = null;
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          this.broadcastChannel = new BroadcastChannel('histada_multiplayer_' + this.roomId);
          this.broadcastChannel.onmessage = (e) => this.handleBroadcastMessage(e.data);
        }
      } catch (e) {}

      // Bieżąca obecność
      this.currentPresence = {
        s: 'map',
        x: 500,
        y: 400,
        c: 0,
        score: 0,
        speaking: false
      };

      this.pollTimer = null;
      this.init();
    }

    init() {
      // Rejestracja w pokoju
      this.joinRoom(this.roomId);

      // Pętla odpytywania serwera (co 1.8 sekundy)
      this.pollTimer = setInterval(() => this.poll(), 1800);

      // Nasłuchuj zmian przed zamknięciem strony
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
          this.leave();
        });
      }
    }

    setRoom(newRoomId) {
      const clean = String(newRoomId || 'histada-global').toLowerCase().trim() || 'histada-global';
      if (clean === this.roomId) return;
      this.leave();
      this.roomId = clean;
      try { localStorage.setItem('histada.roomId', clean); } catch (e) {}

      if (this.broadcastChannel) {
        try { this.broadcastChannel.close(); } catch (e) {}
        try {
          this.broadcastChannel = new BroadcastChannel('histada_multiplayer_' + this.roomId);
          this.broadcastChannel.onmessage = (e) => this.handleBroadcastMessage(e.data);
        } catch (e) {}
      }

      this.messages = [];
      this.peers = [];
      this.lastPollTs = 0;
      this.joinRoom(this.roomId);
    }

    async joinRoom(roomId) {
      this.roomId = roomId;
      try {
        const res = await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'join',
            roomId: this.roomId,
            peerId: this.myId,
            name: this.myName,
            presence: this.currentPresence
          })
        });
        if (res.ok) {
          this.setConnected(true);
          await this.poll();
        }
      } catch (e) {
        // Fallback offline / broadcast
        this.setConnected(false);
      }
    }

    setConnected(st) {
      if (this.isConnected !== st) {
        this.isConnected = st;
        this.emitLocal('connection', st);
      }
    }

    // Cykliczne pobieranie obecności, wiadomości i sygnałów
    async poll() {
      try {
        const url = `${this.apiEndpoint}?room=${encodeURIComponent(this.roomId)}&since=${this.lastPollTs}&peerId=${encodeURIComponent(this.myId)}`;
        const res = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
        if (!res.ok) throw new Error('Poll error: ' + res.status);

        const data = await res.json();
        this.setConnected(true);
        if (data.serverTime) this.lastPollTs = data.serverTime;

        // 1. Zaktualizuj listę graczy
        if (Array.isArray(data.peers)) {
          const prevPeers = this.peers;
          this.peers = data.peers;

          const joined = this.peers.filter(p => p.peer !== this.myId && !prevPeers.some(op => op.peer === p.peer));
          const left = prevPeers.filter(op => op.peer !== this.myId && !this.peers.some(p => p.peer === op.peer));

          this.emitLocal('peers', {
            peers: this.peers.map(p => ({
              peer: p.peer,
              id: p.peer,
              isMe: p.peer === this.myId,
              sameTab: p.peer === this.myId,
              by: p.peer,
              name: p.name,
              kind: 'viewer',
              presence: p.presence || { s: p.scene, x: p.x, y: p.y, c: p.char },
              speaking: p.speaking
            })),
            joined,
            left
          });

          // Jeśli jesteśmy w czacie głosowym, połącz się z nowymi uczestnikami
          if (this.isVoiceJoined) {
            this.syncWebRTCPeers(this.peers);
          }
        }

        // 2. Wiadomości czatu (tekst i audio)
        if (Array.isArray(data.messages) && data.messages.length) {
          data.messages.forEach(m => {
            const isMine = m.peerId === this.myId;
            if (!this.messages.some(ex => ex.id === m.id)) {
              this.messages.push(m);
              this.emitLocal('chat', {
                data: {
                  s: m.scene,
                  scope: m.scope,
                  t: m.text,
                  audioData: m.audioData,
                  duration: m.duration,
                  id: m.id
                },
                peer: m.peerId,
                by: m.peerId,
                name: m.name,
                col: m.col,
                isMe: isMine,
                sameTab: isMine,
                at: m.at,
                audioData: m.audioData,
                duration: m.duration
              });
            }
          });
        }

        // 3. Sygnały WebRTC dla czatu głosowego
        if (Array.isArray(data.signals) && data.signals.length) {
          data.signals.forEach(s => {
            this.handleRemoteSignal(s);
          });
        }

        // 4. Zdarzenia (pomachanie, quiz)
        if (Array.isArray(data.events) && data.events.length) {
          data.events.forEach(e => {
            if (e.type === 'wave') {
              this.emitLocal('wave', { data: e.data, peer: e.fromPeer });
            } else if (e.type === 'game') {
              this.emitLocal('game', { data: e.data, fromPeer: e.fromPeer });
            }
          });
        }

      } catch (err) {
        // Serwer niedostępny chwilowo
        this.setConnected(false);
      }
    }

    // Wysłanie aktualnej pozycji i sceny
    async sendPresence(pres = {}) {
      this.currentPresence = Object.assign(this.currentPresence, pres, { speaking: this.isSpeaking });
      this.broadcastLocally({ type: 'presence', peerId: this.myId, presence: this.currentPresence, name: this.myName });

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'presence',
            roomId: this.roomId,
            peerId: this.myId,
            name: this.myName,
            presence: this.currentPresence
          })
        });
      } catch (e) {}
    }

    // Wysłanie wiadomości tekstowej
    async sendTextMessage(text, scope = 'all', scene = 'map') {
      const clean = String(text || '').trim();
      if (!clean) return;

      const chatPayload = {
        text: clean,
        t: clean,
        scope,
        scene,
        s: scene,
        col: this.getMyColor()
      };

      this.broadcastLocally({ type: 'chat', chat: chatPayload, peerId: this.myId, name: this.myName });

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'chat',
            roomId: this.roomId,
            peerId: this.myId,
            name: this.myName,
            chat: chatPayload
          })
        });
        await this.poll();
      } catch (e) {}
    }

    // Wysłanie notatki / wiadomości głosowej audio
    async sendAudioMessage(audioBase64, durationSec = 0, scope = 'all', scene = 'map') {
      if (!audioBase64) return;

      const chatPayload = {
        text: '🎤 Wiadomość głosowa / Voice Note',
        t: '🎤 Wiadomość głosowa / Voice Note',
        audioData: audioBase64,
        duration: durationSec,
        scope,
        scene,
        s: scene,
        col: this.getMyColor()
      };

      this.broadcastLocally({ type: 'chat', chat: chatPayload, peerId: this.myId, name: this.myName });

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'chat',
            roomId: this.roomId,
            peerId: this.myId,
            name: this.myName,
            chat: chatPayload
          })
        });
        await this.poll();
      } catch (e) {}
    }

    // Pomachanie innemu graczowi
    async sendWave(toPeerId) {
      const evPayload = { type: 'wave', targetPeer: toPeerId, data: { to: toPeerId } };
      this.broadcastLocally({ type: 'wave', toPeerId, fromPeer: this.myId });

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'event',
            roomId: this.roomId,
            peerId: this.myId,
            event: evPayload
          })
        });
      } catch (e) {}
    }

    // Wysłanie zdarzenia gry (np. kość, quiz)
    async sendGameEvent(eventType, eventData = {}) {
      const evPayload = { type: eventType, data: eventData };
      this.broadcastLocally({ type: 'game', eventType, eventData, fromPeer: this.myId });

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'event',
            roomId: this.roomId,
            peerId: this.myId,
            event: evPayload
          })
        });
      } catch (e) {}
    }

    // Zapis profilu gracza w chmurze
    async savePlayerProfile(profileData) {
      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'save_profile',
            roomId: this.roomId,
            peerId: this.myId,
            playerProfile: profileData
          })
        });
      } catch (e) {}
    }

    // ================= NAGRYWANIE DŹWIĘKU AUDIO (VOICE NOTES) =================
    async startAudioRecording() {
      if (this.isRecordingAudioMsg) return false;
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Brak wsparcia dla nagrywania dźwięku w tej przeglądarce.');
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioChunks = [];
        this.recordStartTime = Date.now();

        let mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported('audio/webm')) {
          if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
          else mimeType = '';
        }

        const options = mimeType ? { mimeType } : undefined;
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) this.audioChunks.push(e.data);
        };

        this.mediaRecorder.start(100);
        this.isRecordingAudioMsg = true;
        return true;
      } catch (err) {
        console.warn('Błąd dostępu do mikrofonu:', err);
        throw err;
      }
    }

    async stopAudioRecording() {
      if (!this.isRecordingAudioMsg || !this.mediaRecorder) return null;

      return new Promise((resolve) => {
        this.mediaRecorder.onstop = async () => {
          const duration = Math.round((Date.now() - this.recordStartTime) / 1000);
          const blob = new Blob(this.audioChunks, { type: this.mediaRecorder.mimeType || 'audio/webm' });

          // Zatrzymaj ścieżki mikrofonu
          if (this.mediaRecorder.stream) {
            this.mediaRecorder.stream.getTracks().forEach(t => t.stop());
          }

          this.isRecordingAudioMsg = false;
          this.mediaRecorder = null;
          this.audioChunks = [];

          // Konwersja na data URL base64
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              audioBase64: reader.result,
              duration: Math.max(1, duration)
            });
          };
          reader.readAsDataURL(blob);
        };

        this.mediaRecorder.stop();
      });
    }

    cancelAudioRecording() {
      if (this.mediaRecorder) {
        try {
          if (this.mediaRecorder.stream) {
            this.mediaRecorder.stream.getTracks().forEach(t => t.stop());
          }
          this.mediaRecorder.stop();
        } catch (e) {}
      }
      this.isRecordingAudioMsg = false;
      this.mediaRecorder = null;
      this.audioChunks = [];
    }

    // ================= CZAT GŁOSOWY NA ŻYWO (LIVE WEBRTC VOICE CHAT) =================
    async joinVoiceChat() {
      if (this.isVoiceJoined) return true;
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Przeglądarka nie obsługuje czatu głosowego WebRTC.');
        }

        this.localMediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });

        // Domyślnie mikrofon wyciszony
        this.setMicMuted(this.isMicMuted);

        // Uruchom analizator głosu (wykrywanie mowy)
        this.setupVoiceActivityDetection(this.localMediaStream);

        this.isVoiceJoined = true;
        this.syncWebRTCPeers(this.peers);
        this.emitLocal('voice', { state: 'joined', isMuted: this.isMicMuted });
        return true;
      } catch (err) {
        console.warn('Nie udało się dołączyć do czatu głosowego:', err);
        throw err;
      }
    }

    leaveVoiceChat() {
      if (!this.isVoiceJoined) return;
      this.isVoiceJoined = false;

      if (this.localMediaStream) {
        this.localMediaStream.getTracks().forEach(t => t.stop());
        this.localMediaStream = null;
      }

      this.peerConnections.forEach(pc => {
        try { pc.close(); } catch (e) {}
      });
      this.peerConnections.clear();

      if (this.audioContext) {
        try { this.audioContext.close(); } catch (e) {}
        this.audioContext = null;
      }

      this.emitLocal('voice', { state: 'left' });
    }

    setMicMuted(muted) {
      this.isMicMuted = !!muted;
      if (this.localMediaStream) {
        this.localMediaStream.getAudioTracks().forEach(track => {
          track.enabled = !this.isMicMuted;
        });
      }
      this.emitLocal('voice', { state: 'mic', isMuted: this.isMicMuted });
    }

    toggleMic() {
      this.setMicMuted(!this.isMicMuted);
      return this.isMicMuted;
    }

    setupVoiceActivityDetection(stream) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        this.audioContext = new AudioContextClass();
        const source = this.audioContext.createMediaStreamSource(stream);
        this.audioAnalyser = this.audioContext.createAnalyser();
        this.audioAnalyser.fftSize = 256;
        source.connect(this.audioAnalyser);

        const dataArray = new Uint8Array(this.audioAnalyser.frequencyBinCount);
        const checkSpeech = () => {
          if (!this.isVoiceJoined || !this.audioAnalyser) return;
          if (this.isMicMuted) {
            if (this.isSpeaking) {
              this.isSpeaking = false;
              this.sendPresence({ speaking: false });
            }
            setTimeout(checkSpeech, 300);
            return;
          }

          this.audioAnalyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          const avg = sum / dataArray.length;

          const nowSpeaking = avg > 20;
          if (nowSpeaking !== this.isSpeaking) {
            this.isSpeaking = nowSpeaking;
            this.sendPresence({ speaking: this.isSpeaking });
            this.emitLocal('voice', { state: 'speaking', isSpeaking: this.isSpeaking, peerId: this.myId });
          }

          setTimeout(checkSpeech, 200);
        };

        checkSpeech();
      } catch (e) {}
    }

    syncWebRTCPeers(activePeers) {
      if (!this.isVoiceJoined || !this.localMediaStream) return;

      activePeers.forEach(p => {
        if (p.peer === this.myId) return;
        if (!this.peerConnections.has(p.peer)) {
          this.initiatePeerConnection(p.peer);
        }
      });
    }

    initiatePeerConnection(remotePeerId) {
      if (this.peerConnections.has(remotePeerId)) return;

      try {
        const pc = new RTCPeerConnection(this.rtcConfig);
        this.peerConnections.set(remotePeerId, pc);

        if (this.localMediaStream) {
          this.localMediaStream.getTracks().forEach(track => {
            pc.addTrack(track, this.localMediaStream);
          });
        }

        pc.onicecandidate = (e) => {
          if (e.candidate) {
            this.sendWebRTCSignal(remotePeerId, { candidate: e.candidate });
          }
        };

        pc.ontrack = (e) => {
          const remoteStream = e.streams[0];
          this.playRemoteAudio(remotePeerId, remoteStream);
        };

        // Tworzenie oferty (dla peerów o niższym ID by uniknąć kolizji)
        if (this.myId < remotePeerId) {
          pc.createOffer().then(offer => {
            return pc.setLocalDescription(offer);
          }).then(() => {
            this.sendWebRTCSignal(remotePeerId, { sdp: pc.localDescription });
          }).catch(() => {});
        }
      } catch (e) {}
    }

    playRemoteAudio(remotePeerId, stream) {
      let audioEl = document.getElementById('histada_remote_audio_' + remotePeerId);
      if (!audioEl) {
        audioEl = document.createElement('audio');
        audioEl.id = 'histada_remote_audio_' + remotePeerId;
        audioEl.autoplay = true;
        audioEl.playsInline = true;
        audioEl.style.display = 'none';
        document.body.appendChild(audioEl);
      }
      audioEl.srcObject = stream;
      audioEl.muted = this.isDeafened;
      audioEl.play().catch(() => {});
    }

    sendWebRTCSignal(toPeer, data) {
      try {
        fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            action: 'signal',
            roomId: this.roomId,
            peerId: this.myId,
            signal: { toPeer, data }
          })
        }).catch(() => {});
      } catch (e) {}
    }

    async handleRemoteSignal(sig) {
      if (!this.isVoiceJoined || !sig || sig.fromPeer === this.myId) return;
      const remotePeerId = sig.fromPeer;
      const data = sig.data;
      if (!data) return;

      let pc = this.peerConnections.get(remotePeerId);
      if (!pc) {
        this.initiatePeerConnection(remotePeerId);
        pc = this.peerConnections.get(remotePeerId);
      }
      if (!pc) return;

      try {
        if (data.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          if (data.sdp.type === 'offer') {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            this.sendWebRTCSignal(remotePeerId, { sdp: pc.localDescription });
          }
        } else if (data.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (e) {}
    }

    // ================= OBSŁUGA ZDARZEŃ LOKALNYCH I BROADCAST =================
    broadcastLocally(msg) {
      if (this.broadcastChannel) {
        try { this.broadcastChannel.postMessage(msg); } catch (e) {}
      }
    }

    handleBroadcastMessage(msg) {
      if (!msg || msg.peerId === this.myId) return;
      if (msg.type === 'chat') {
        const c = msg.chat;
        this.emitLocal('chat', {
          data: { s: c.scene, scope: c.scope, t: c.text, audioData: c.audioData, duration: c.duration },
          peer: msg.peerId,
          by: msg.peerId,
          name: msg.name,
          col: c.col,
          isMe: false,
          sameTab: false,
          at: new Date().toTimeString().slice(0, 5),
          audioData: c.audioData,
          duration: c.duration
        });
      } else if (msg.type === 'wave') {
        this.emitLocal('wave', { data: { to: msg.toPeerId }, peer: msg.fromPeer });
      } else if (msg.type === 'game') {
        this.emitLocal('game', { eventType: msg.eventType, data: msg.eventData, fromPeer: msg.fromPeer });
      }
    }

    on(event, fn) {
      if (this.listeners[event]) this.listeners[event].push(fn);
    }

    emitLocal(event, payload) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(fn => {
          try { fn(payload); } catch (e) {}
        });
      }
    }

    getMyColor() {
      const colors = ['#d1495b', '#2f6db5', '#2e8b57', '#e65100', '#8e24aa', '#d9b25a'];
      let hash = 0;
      for (let i = 0; i < this.myId.length; i++) hash += this.myId.charCodeAt(i);
      return colors[Math.abs(hash) % colors.length];
    }

    
    // Zmiana aktywnego pokoju
    changeRoom(newRoomId) {
      if (!newRoomId || newRoomId === this.roomId) return;
      this.leave();
      this.roomId = String(newRoomId).toLowerCase().trim().slice(0, 40) || 'histada-global';
      this.peers = [];
      try {
        const u = new URL(window.location.href);
        u.searchParams.set('room', this.roomId);
        window.history.replaceState(null, '', u.toString());
      } catch (e) {}
      this.init();
      this.poll();
    }

    // Pobierz link z zaproszeniem do bieżącego pokoju
    getInviteUrl() {
      try {
        const u = new URL(window.location.href);
        u.searchParams.set('room', this.roomId);
        return u.toString();
      } catch (e) {
        return window.location.href;
      }
    }

    leave() {
      this.leaveVoiceChat();
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
      try {
        fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action: 'leave', roomId: this.roomId, peerId: this.myId }),
          keepalive: true
        }).catch(() => {});
      } catch (e) {}
    }
  }

  // Zainicjalizuj globalny silnik
  const networkEngine = new HistadaNetworkEngine();
  window.HistadaNetwork = networkEngine;

  // =========================================================================
  // IMPLEMENTACJA SHIMU DLA CLAUDE SDK (room, db, user)
  // Automatycznie włącza multiplayer i czat w Kręgu Tajemnicy!
  // =========================================================================
  const roomShim = Object.freeze({
    peers: () => networkEngine.peers.map(p => ({
      peer: p.peer,
      id: p.peer,
      isMe: p.peer === networkEngine.myId,
      sameTab: p.peer === networkEngine.myId,
      by: p.peer,
      name: p.name,
      kind: 'viewer',
      presence: p.presence || { s: p.scene, x: p.x, y: p.y, c: p.char },
      speaking: p.speaking
    })),
    onPeers: (fn) => networkEngine.on('peers', fn),
    presence: (pres) => networkEngine.sendPresence(pres),
    emit: (event, data) => {
      if (event === 'chat') {
        return networkEngine.sendTextMessage(data.t || data.text, data.scope || 'here', data.s || 'map');
      }
      if (event === 'wave') {
        return networkEngine.sendWave(data.to);
      }
      return networkEngine.sendGameEvent(event, data);
    },
    on: (event, fn) => networkEngine.on(event, fn),
    onConnection: (fn) => networkEngine.on('connection', fn)
  });

  const userShim = Object.freeze({
    me: () => Promise.resolve({ id: networkEngine.myId, name: networkEngine.myName }),
    can: () => Promise.resolve(true),
    profiles: (ids) => {
      const map = {};
      ids.forEach(id => {
        const found = networkEngine.peers.find(p => p.peer === id);
        map[id] = { name: found ? found.name : 'Podróżnik' };
      });
      return Promise.resolve(map);
    }
  });

  const dbShim = Object.freeze({
    doc: (docPath) => ({
      get: () => {
        try {
          const raw = localStorage.getItem('histada.db.' + docPath);
          return Promise.resolve({ exists: !!raw, data: () => raw ? JSON.parse(raw) : null });
        } catch (e) {
          return Promise.resolve({ exists: false, data: () => null });
        }
      },
      set: (data) => {
        try {
          localStorage.setItem('histada.db.' + docPath, JSON.stringify(data));
          if (docPath.startsWith('players/')) {
            networkEngine.savePlayerProfile(data);
          }
        } catch (e) {}
        return Promise.resolve();
      }
    }),
    collection: (colPath) => ({
      orderBy: () => ({
        limit: () => ({
          onSnapshot: (callback) => {
            // Początkowy stan
            setTimeout(() => {
              callback({
                docs: [
                  { id: networkEngine.myId, exists: true, data: () => ({ total: 100, name: networkEngine.myName }) }
                ]
              });
            }, 300);
          }
        })
      })
    })
  });

  // Rejestracja w window.claude.use
  if (typeof window !== 'undefined') {
    window._histada_network_shims = {
      room: roomShim,
      user: userShim,
      db: dbShim
    };

    if (window.claude && window.claude.use) {
      const origUse = window.claude.use;
      window.claude = Object.freeze({
        use: function (name) {
          if (name === 'room') return Promise.resolve(roomShim);
          if (name === 'user') return Promise.resolve(userShim);
          if (name === 'db') return Promise.resolve(dbShim);
          return origUse(name);
        }
      });
    }
  }


  // =========================================================================
  // HISTADA AUDIO HELPER (Odtwarzanie i zarządzanie notatkami audio)
  // =========================================================================
  window.HistadaAudioHelper = {
    currentAudio: null,
    currentBtn: null,
    play: function (btn, audioDataUrl) {
      try {
        if (this.currentAudio) {
          this.currentAudio.pause();
          if (this.currentBtn) {
            this.currentBtn.textContent = this.currentBtn.__origText || '▶ Odtwórz';
            this.currentBtn.classList.remove('playing');
            this.currentBtn.__playing = false;
          }
          if (this.currentBtn === btn) {
            this.currentAudio = null;
            this.currentBtn = null;
            return;
          }
        }
        var audio = new Audio(audioDataUrl);
        this.currentAudio = audio;
        this.currentBtn = btn;
        if (!btn.__origText) btn.__origText = btn.textContent;
        btn.textContent = '⏸ Pauza';
        btn.classList.add('playing');
        btn.__playing = true;

        audio.onended = () => {
          btn.textContent = btn.__origText;
          btn.classList.remove('playing');
          btn.__playing = false;
          this.currentAudio = null;
          this.currentBtn = null;
        };
        audio.onerror = () => {
          btn.textContent = btn.__origText;
          btn.classList.remove('playing');
          btn.__playing = false;
          this.currentAudio = null;
          this.currentBtn = null;
          alert('Nie udało się odtworzyć nagrania audio.');
        };
        audio.play().catch(e => {
          console.warn('Błąd odtwarzania:', e);
          btn.textContent = btn.__origText;
          btn.classList.remove('playing');
          btn.__playing = false;
        });
      } catch (err) {
        console.error('Audio play error:', err);
      }
    }
  };

  // =========================================================================
  // HISTADA SOCIAL WIDGET (Uniwersalny pasek społecznościowy i czat Audio/Tekst)
  // =========================================================================
  window.HistadaSocialWidget = {
    isOpen: false,
    timerInterval: null,
    recordSeconds: 0,
    activeTab: 'chat',

    init: function () {
      if (document.getElementById('histada-social-root')) return;
      this.injectStyles();
      this.injectMarkup();
      this.bindEvents();
      this.syncUI();
    },

    injectStyles: function () {
      const style = document.createElement('style');
      style.id = 'histada-social-styles';
      style.textContent = `
        .h-social-launcher {
          position: fixed;
          bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          right: 16px;
          z-index: 9990;
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #182642, #101a2e);
          border: 1.5px solid #d9b25a;
          color: #ece5d2;
          font-family: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 14px rgba(217, 178, 90, 0.25);
          transition: all 0.2s ease;
          user-select: none;
        }
        .h-social-launcher:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.6), 0 0 20px rgba(217, 178, 90, 0.4);
          border-color: #f0d48f;
        }
        .h-social-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #4fbd84;
          box-shadow: 0 0 8px #4fbd84;
          flex-shrink: 0;
        }
        .h-social-dot.offline {
          background: #8892b0;
          box-shadow: none;
        }
        .h-social-badge {
          background: #d9b25a;
          color: #1c1405;
          font-size: 11px;
          font-weight: 700;
          border-radius: 99px;
          padding: 1px 6px;
          margin-left: 2px;
        }
        .h-social-voice-active-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e4665a;
          animation: h-pulse 1.2s infinite;
        }
        @keyframes h-pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }

        /* Modal / Drawer */
        .h-social-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 8, 16, 0.75);
          backdrop-filter: blur(4px);
          z-index: 9995;
          display: flex;
          justify-content: flex-end;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .h-social-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .h-social-drawer {
          width: min(440px, 100vw);
          height: 100%;
          background: #101a2e;
          border-left: 1px solid #2b3b5c;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0,0,0,0.6);
          font-family: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
          color: #ece5d2;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .h-social-modal-overlay.open .h-social-drawer {
          transform: translateX(0);
        }

        /* Drawer Header */
        .h-social-header {
          padding: 14px 18px;
          background: #141f35;
          border-bottom: 1px solid #2b3b5c;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .h-social-title {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 700;
          color: #f0d48f;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .h-social-close {
          background: transparent;
          border: none;
          color: #9aa6bb;
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
        }
        .h-social-close:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }

        /* Room bar */
        .h-social-room-bar {
          padding: 10px 18px;
          background: #182642;
          border-bottom: 1px solid #2b3b5c;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 12.5px;
        }
        .h-social-room-code {
          color: #d9b25a;
          font-weight: 600;
          font-family: monospace;
          background: rgba(0,0,0,0.25);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .h-social-btn-sm {
          background: #1b2842;
          border: 1px solid #2b3b5c;
          color: #ece5d2;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.15s;
        }
        .h-social-btn-sm:hover {
          border-color: #d9b25a;
          color: #f0d48f;
        }

        /* Voice Chat Section */
        .h-social-voice-box {
          margin: 12px 18px;
          padding: 12px 14px;
          background: rgba(20, 31, 53, 0.7);
          border: 1px solid #2b3b5c;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .h-voice-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .h-voice-title {
          font-size: 13px;
          font-weight: 600;
          color: #f0d48f;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .h-voice-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .h-btn-voice-join {
          background: #4fbd84;
          border: 1px solid #4fbd84;
          color: #0c1a11;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }
        .h-btn-voice-leave {
          background: #c0392b;
          border: 1px solid #e74c3c;
          color: #fff;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }
        .h-btn-voice-mute {
          background: #1b2842;
          border: 1px solid #2b3b5c;
          color: #ece5d2;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }
        .h-btn-voice-mute.muted {
          background: #e4665a;
          color: #fff;
          border-color: #e4665a;
        }
        .h-voice-speaking-indicator {
          font-size: 11.5px;
          color: #4fbd84;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Tabs */
        .h-social-tabs {
          display: flex;
          border-bottom: 1px solid #2b3b5c;
          background: #141f35;
        }
        .h-social-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: #9aa6bb;
          padding: 9px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .h-social-tab-btn.active {
          color: #f0d48f;
          border-bottom-color: #d9b25a;
          background: rgba(217, 178, 90, 0.05);
        }

        /* Tab Content */
        .h-social-tab-pane {
          flex: 1;
          display: none;
          flex-direction: column;
          overflow: hidden;
        }
        .h-social-tab-pane.active {
          display: flex;
        }

        /* Players List */
        .h-players-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .h-player-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: #141f35;
          border: 1px solid #2b3b5c;
          border-radius: 8px;
          font-size: 13px;
        }
        .h-player-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .h-player-info {
          flex: 1;
          min-width: 0;
        }
        .h-player-name {
          font-weight: 600;
          color: #ece5d2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .h-player-sub {
          font-size: 11.5px;
          color: #9aa6bb;
        }

        /* Messages */
        .h-msgs-box {
          flex: 1;
          overflow-y: auto;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .h-msg {
          font-size: 13px;
          line-height: 1.45;
          overflow-wrap: anywhere;
          background: #141f35;
          border: 1px solid #1b2842;
          border-radius: 8px;
          padding: 8px 12px;
        }
        .h-msg-head {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 4px;
        }
        .h-msg-by {
          font-weight: 700;
        }
        .h-msg-time {
          color: #9aa6bb;
        }
        .h-msg-audio-card {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
          background: rgba(0,0,0,0.25);
          padding: 6px 10px;
          border-radius: 6px;
        }
        .h-btn-play-audio {
          background: #d9b25a;
          color: #1c1405;
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .h-btn-play-audio.playing {
          background: #4fbd84;
          color: #0c1a11;
        }

        /* Recording status drawer */
        .h-recording-bar {
          background: #3a151b;
          border-top: 1px solid #e74c3c;
          padding: 8px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 12.5px;
          color: #ff9999;
        }
        .h-rec-pulse {
          width: 10px;
          height: 10px;
          background: #e74c3c;
          border-radius: 50%;
          animation: h-pulse 1s infinite;
        }

        /* Input Form */
        .h-chat-input-bar {
          padding: 10px 18px;
          background: #141f35;
          border-top: 1px solid #2b3b5c;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .h-chat-input-bar input {
          flex: 1;
          background: #0b1220;
          border: 1px solid #2b3b5c;
          color: #ece5d2;
          font-size: 13px;
          padding: 8px 12px;
          border-radius: 6px;
          outline: none;
        }
        .h-chat-input-bar input:focus {
          border-color: #d9b25a;
        }
        .h-btn-mic-rec {
          background: #1b2842;
          border: 1px solid #2b3b5c;
          color: #f0d48f;
          font-size: 16px;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .h-btn-mic-rec:hover {
          border-color: #d9b25a;
        }
        .h-btn-send {
          background: #d9b25a;
          border: 1px solid #d9b25a;
          color: #1c1405;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
        }
      `;
      document.head.appendChild(style);
    },

    injectMarkup: function () {
      const wrapper = document.createElement('div');
      wrapper.id = 'histada-social-root';
      wrapper.innerHTML = `
        <!-- Launcher Floating Button -->
        <div class="h-social-launcher" id="hSocialLauncher" title="Czat społecznościowy, audio i gracze online">
          <span class="h-social-dot" id="hLauncherDot"></span>
          <span>👥 Społeczność & Czat</span>
          <span class="h-social-badge" id="hLauncherBadge">1</span>
        </div>

        <!-- Social Modal / Drawer -->
        <div class="h-social-modal-overlay" id="hSocialModal">
          <div class="h-social-drawer">
            <!-- Header -->
            <div class="h-social-header">
              <div class="h-social-title">
                <span>🌐 HISTADA ONLINE</span>
              </div>
              <button class="h-social-close" id="hSocialClose" title="Zamknij">✕</button>
            </div>

            <!-- Room Bar -->
            <div class="h-social-room-bar">
              <div>Pokój: <span class="h-social-room-code" id="hRoomNameDisplay">histada-global</span></div>
              <div style="display:flex;gap:6px;">
                <button class="h-social-btn-sm" id="hBtnCopyInvite">🔗 Kopiuj link</button>
                <button class="h-social-btn-sm" id="hBtnChangeRoom">Zmień pokój</button>
              </div>
            </div>

            <!-- Voice Box -->
            <div class="h-social-voice-box">
              <div class="h-voice-row">
                <div class="h-voice-title">
                  <span>🎙️ Czat głosowy na żywo (WebRTC)</span>
                </div>
                <div class="h-voice-controls">
                  <button class="h-btn-voice-join" id="hBtnVoiceJoin">Dołącz do głosu</button>
                  <button class="h-btn-voice-mute" id="hBtnVoiceMute" style="display:none">Wycisz mic</button>
                  <button class="h-btn-voice-leave" id="hBtnVoiceLeave" style="display:none">Rozłącz</button>
                </div>
              </div>
              <div class="h-voice-speaking-indicator" id="hVoiceSpeakingText" style="display:none">
                <span class="h-social-voice-active-indicator"></span>
                <span>Rozmawiasz na żywo...</span>
              </div>
            </div>

            <!-- Tabs -->
            <div class="h-social-tabs">
              <button class="h-social-tab-btn active" data-tab="chat" id="hTabChat">💬 Czat (Tekst + Audio)</button>
              <button class="h-social-tab-btn" data-tab="players" id="hTabPlayers">👥 Gracze online (<span id="hPlayersTabCount">1</span>)</button>
            </div>

            <!-- Chat Tab -->
            <div class="h-social-tab-pane active" id="hPaneChat">
              <div class="h-msgs-box" id="hMsgsBox">
                <div class="h-msg" style="color:#9aa6bb;font-style:italic">
                  Witaj w społeczności Histada! Pisz wiadomości tekstowe, nagrywaj notatki audio lub dołącz do czatu głosowego na żywo.
                </div>
              </div>

              <!-- Recording Drawer -->
              <div class="h-recording-bar" id="hRecordingBar" style="display:none">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="h-rec-pulse"></span>
                  <span id="hRecTimer">00:00</span>
                  <span>Nagrywanie głosu...</span>
                </div>
                <div style="display:flex;gap:6px;">
                  <button class="h-social-btn-sm" id="hBtnRecSend" style="background:#d9b25a;color:#1c1405;font-weight:700">Wyślij ⬆️</button>
                  <button class="h-social-btn-sm" id="hBtnRecCancel">Anuluj</button>
                </div>
              </div>

              <!-- Form -->
              <form class="h-chat-input-bar" id="hChatForm">
                <button type="button" class="h-btn-mic-rec" id="hBtnMicRecord" title="Nagraj wiadomość głosową">🎤</button>
                <input type="text" id="hChatTextInput" placeholder="Napisz wiadomość do graczy..." maxlength="240" autocomplete="off" />
                <button type="submit" class="h-btn-send">Wyślij</button>
              </form>
            </div>

            <!-- Players Tab -->
            <div class="h-social-tab-pane" id="hPanePlayers">
              <div class="h-players-list" id="hPlayersList">
                <!-- Players rendered here -->
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(wrapper);
    },

    bindEvents: function () {
      const net = window.HistadaNetwork;
      const modal = document.getElementById('hSocialModal');
      const launcher = document.getElementById('hSocialLauncher');
      const closeBtn = document.getElementById('hSocialClose');
      const tabChat = document.getElementById('hTabChat');
      const tabPlayers = document.getElementById('hTabPlayers');
      const paneChat = document.getElementById('hPaneChat');
      const panePlayers = document.getElementById('hPanePlayers');
      const copyInvite = document.getElementById('hBtnCopyInvite');
      const changeRoom = document.getElementById('hBtnChangeRoom');
      const voiceJoin = document.getElementById('hBtnVoiceJoin');
      const voiceMute = document.getElementById('hBtnVoiceMute');
      const voiceLeave = document.getElementById('hBtnVoiceLeave');
      const chatForm = document.getElementById('hChatForm');
      const micRec = document.getElementById('hBtnMicRecord');
      const recSend = document.getElementById('hBtnRecSend');
      const recCancel = document.getElementById('hBtnRecCancel');

      if (!launcher || !modal) return;

      // Launcher toggle
      launcher.onclick = () => {
        this.isOpen = !this.isOpen;
        modal.classList.toggle('open', this.isOpen);
        if (this.isOpen) {
          this.syncUI();
          this.scrollToBottom();
        }
      };

      if (closeBtn) closeBtn.onclick = () => {
        this.isOpen = false;
        modal.classList.remove('open');
      };

      modal.onclick = (e) => {
        if (e.target === modal) {
          this.isOpen = false;
          modal.classList.remove('open');
        }
      };

      // Tabs switch
      if (tabChat) tabChat.onclick = () => {
        tabChat.classList.add('active');
        tabPlayers.classList.remove('active');
        paneChat.classList.add('active');
        panePlayers.classList.remove('active');
        this.activeTab = 'chat';
        this.scrollToBottom();
      };
      if (tabPlayers) tabPlayers.onclick = () => {
        tabPlayers.classList.add('active');
        tabChat.classList.remove('active');
        panePlayers.classList.add('active');
        paneChat.classList.remove('active');
        this.activeTab = 'players';
        this.renderPlayersList();
      };

      // Copy invite link
      if (copyInvite) copyInvite.onclick = () => {
        const url = net ? net.getInviteUrl() : window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          copyInvite.textContent = 'Skopiowano!';
          setTimeout(() => { copyInvite.textContent = '🔗 Kopiuj link'; }, 2000);
        }).catch(() => {
          prompt('Skopiuj link do pokoju:', url);
        });
      };

      // Change room
      if (changeRoom) changeRoom.onclick = () => {
        const current = net ? net.roomId : 'histada-global';
        const target = prompt('Podaj kod pokoju społecznościowego (np. znajomi, historia, klasa):', current);
        if (target && target.trim() && target.trim() !== current) {
          if (net) net.changeRoom(target.trim());
          document.getElementById('hRoomNameDisplay').textContent = target.trim();
        }
      };

      // Voice controls
      if (voiceJoin) voiceJoin.onclick = async () => {
        if (!net) return;
        try {
          voiceJoin.textContent = 'Łączenie...';
          await net.joinVoiceChat();
          voiceJoin.style.display = 'none';
          voiceMute.style.display = 'inline-block';
          voiceLeave.style.display = 'inline-block';
          document.getElementById('hVoiceSpeakingText').style.display = 'flex';
        } catch (e) {
          alert('Błąd dostępu do mikrofonu: ' + (e.message || 'Odmowa'));
          voiceJoin.textContent = 'Dołącz do głosu';
        }
      };

      if (voiceMute) voiceMute.onclick = () => {
        if (!net) return;
        const isMuted = net.toggleMic();
        voiceMute.textContent = isMuted ? 'Włącz mic' : 'Wycisz mic';
        voiceMute.classList.toggle('muted', isMuted);
      };

      if (voiceLeave) voiceLeave.onclick = () => {
        if (!net) return;
        net.leaveVoiceChat();
        voiceJoin.style.display = 'inline-block';
        voiceJoin.textContent = 'Dołącz do głosu';
        voiceMute.style.display = 'none';
        voiceLeave.style.display = 'none';
        document.getElementById('hVoiceSpeakingText').style.display = 'none';
      };

      // Chat submission
      if (chatForm) chatForm.onsubmit = async (e) => {
        e.preventDefault();
        const input = document.getElementById('hChatTextInput');
        const text = input.value.trim();
        if (!text || !net) return;
        input.value = '';
        await net.sendTextMessage(text, 'all', 'global');
      };

      // Audio recording
      if (micRec) micRec.onclick = async () => {
        if (!net) return;
        try {
          const ok = await net.startAudioRecording();
          if (ok) {
            document.getElementById('hRecordingBar').style.display = 'flex';
            this.recordSeconds = 0;
            document.getElementById('hRecTimer').textContent = '00:00';
            this.timerInterval = setInterval(() => {
              this.recordSeconds++;
              const m = String(Math.floor(this.recordSeconds / 60)).padStart(2, '0');
              const s = String(this.recordSeconds % 60).padStart(2, '0');
              document.getElementById('hRecTimer').textContent = m + ':' + s;
              if (this.recordSeconds >= 60) {
                recSend.click();
              }
            }, 1000);
          }
        } catch (e) {
          alert('Błąd uruchomienia nagrywania audio: ' + (e.message || 'Brak uprawnień'));
        }
      };

      if (recSend) recSend.onclick = async () => {
        if (!net) return;
        clearInterval(this.timerInterval);
        document.getElementById('hRecordingBar').style.display = 'none';
        const result = await net.stopAudioRecording();
        if (result && result.audioBase64) {
          await net.sendAudioMessage(result.audioBase64, result.duration, 'all', 'global');
        }
      };

      if (recCancel) recCancel.onclick = () => {
        if (!net) return;
        clearInterval(this.timerInterval);
        document.getElementById('hRecordingBar').style.display = 'none';
        net.cancelAudioRecording();
      };

      // Net listeners
      if (net) {
        net.on('peers', () => {
          this.syncUI();
          if (this.activeTab === 'players') this.renderPlayersList();
        });
        net.on('chat', (m) => {
          this.appendMessage(m);
        });
        net.on('wave', (m) => {
          const p = net.peers.find(x => x.peer === m.peer);
          const name = p ? p.name : 'Inny gracz';
          this.appendSystemMessage('👋 ' + name + ' macha do Ciebie!');
        });
        net.on('voice', (v) => {
          if (v.state === 'speaking') {
            const st = document.getElementById('hVoiceSpeakingText');
            if (st) {
              st.innerHTML = v.isSpeaking
                ? '<span class="h-social-voice-active-indicator"></span><span>Mówisz teraz (głos aktywny)...</span>'
                : '<span>Połączono z czatem głosowym (cisza)</span>';
            }
          }
        });
      }
    },

    syncUI: function () {
      const net = window.HistadaNetwork;
      if (!net) return;
      const count = (net.peers ? net.peers.length : 0);
      const dot = document.getElementById('hLauncherDot');
      const badge = document.getElementById('hLauncherBadge');
      const pCount = document.getElementById('hPlayersTabCount');
      const roomDisp = document.getElementById('hRoomNameDisplay');

      if (badge) badge.textContent = count;
      if (pCount) pCount.textContent = count;
      if (roomDisp) roomDisp.textContent = net.roomId;
      if (dot) dot.classList.toggle('offline', count <= 1);
    },

    renderPlayersList: function () {
      const net = window.HistadaNetwork;
      const listEl = document.getElementById('hPlayersList');
      if (!net || !listEl) return;

      if (!net.peers || net.peers.length === 0) {
        listEl.innerHTML = '<div style="color:#9aa6bb;padding:12px;text-align:center">Brak innych graczy w tym pokoju. Skopiuj link i zaproś znajomych!</div>';
        return;
      }

      listEl.innerHTML = net.peers.map(p => {
        const isMe = p.peer === net.myId;
        const color = p.color || '#2f6db5';
        const name = p.name || 'Gracz';
        const scene = p.scene || (p.presence && p.presence.s) || 'online';
        return `
          <div class="h-player-card">
            <div class="h-player-avatar" style="background:${color}">${name.charAt(0).toUpperCase()}</div>
            <div class="h-player-info">
              <div class="h-player-name">${name} ${isMe ? '<span style="color:#d9b25a;font-size:11px">(Ty)</span>' : ''}</div>
              <div class="h-player-sub">Lokalizacja: ${scene} ${p.speaking ? ' · 🎙️ mówi' : ''}</div>
            </div>
            ${!isMe ? `<button class="h-social-btn-sm" onclick="window.HistadaNetwork.sendWave('${p.peer}');alert('Pomachano do ${name}!');">👋 Pomachaj</button>` : ''}
          </div>
        `;
      }).join('');
    },

    appendMessage: function (m) {
      const box = document.getElementById('hMsgsBox');
      if (!box) return;
      const d = m.data || {};
      const isMine = m.isMe || m.sameTab || m.mine;
      const name = m.name || (isMine ? 'Ty' : 'Gracz');
      const col = m.col || '#d9b25a';
      const time = m.at || new Date().toTimeString().slice(0, 5);

      const msgEl = document.createElement('div');
      msgEl.className = 'h-msg';

      let bodyHtml = '';
      if (d.audioData || m.audioData) {
        const audioSrc = d.audioData || m.audioData;
        const dur = d.duration || m.duration || '';
        bodyHtml = `
          <div class="h-msg-audio-card">
            <button type="button" class="h-btn-play-audio" onclick="window.HistadaAudioHelper.play(this, '${audioSrc}')">
              ▶ Odtwórz audio ${dur ? '(' + dur + 's)' : ''}
            </button>
            <span style="font-size:11px;color:#9aa6bb">Wiadomość głosowa</span>
          </div>
        `;
      } else {
        var safeT = String(d.t || d.text || m.t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); bodyHtml = '<div>' + safeT + '</div>';
      }

      msgEl.innerHTML = `
        <div class="h-msg-head">
          <span class="h-msg-by" style="color:${col}">${name}</span>
          <span class="h-msg-time">${time}</span>
        </div>
        ${bodyHtml}
      `;

      box.appendChild(msgEl);
      this.scrollToBottom();
    },

    appendSystemMessage: function (txt) {
      const box = document.getElementById('hMsgsBox');
      if (!box) return;
      const msgEl = document.createElement('div');
      msgEl.className = 'h-msg';
      msgEl.style.fontStyle = 'italic';
      msgEl.style.color = '#f0d48f';
      msgEl.textContent = txt;
      box.appendChild(msgEl);
      this.scrollToBottom();
    },

    scrollToBottom: function () {
      const box = document.getElementById('hMsgsBox');
      if (box) box.scrollTop = box.scrollHeight;
    }
  };

  // Auto-inicjalizacja widgetu po załadowaniu DOM
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        window.HistadaSocialWidget.init();
      });
    } else {
      window.HistadaSocialWidget.init();
    }
  }

})();
