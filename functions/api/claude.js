// HISTADA – Cloudflare Pages Function: pośrednik do Claude API.
// Klucz API zostaje na serwerze (zmienna ANTHROPIC_API_KEY), przeglądarka go nie widzi.
//
// Zmienne środowiskowe (Cloudflare → projekt Pages → Settings → Variables and Secrets):
//   ANTHROPIC_API_KEY  (sekret, wymagany)  – bez niego gry działają offline, na banku pytań
//   ACCESS_CODE        (opcjonalny)        – jeśli ustawiony, Claude odpowiada tylko z tym kodem (?kod=... w adresie)
//   ALLOWED_ORIGINS    (opcjonalny)        – lista domen po przecinku, np. https://histada.pages.dev,https://histada.pl
//   MODEL_DEFAULT      (opcjonalny)        – domyślnie claude-sonnet-5-5
//   MODEL_QUICK        (opcjonalny)        – domyślnie claude-haiku-4-5-20251001
//   MAX_TOKENS         (opcjonalny)        – limit odpowiedzi, domyślnie 2500

const MAX_INPUT = 60000;          // znaków promptu
const MAX_IMAGE_B64 = 7_000_000;  // ~5 MB obrazu
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
});

function originAllowed(request, env) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // to samo pochodzenie (GET) albo narzędzie wiersza poleceń
  const own = new URL(request.url).origin;
  if (origin === own) return true;
  const list = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  return list.includes(origin);
}

export async function onRequestGet({ env }) {
  return json({ ok: !!env.ANTHROPIC_API_KEY, images: true, access: !!env.ACCESS_CODE });
}

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'Serwer nie ma klucza ANTHROPIC_API_KEY' }, 503);
  if (!originAllowed(request, env)) return json({ error: 'Niedozwolone pochodzenie' }, 403);
  if (env.ACCESS_CODE && request.headers.get('x-histada-code') !== env.ACCESS_CODE) return json({ error: 'Zły lub brak kodu dostępu' }, 401);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Zły format zapytania' }, 400); }
  let { input, images = [], tier = 'default', json: wantJson = false } = body || {};

  // input: tekst albo lista tur [{role, content}]
  let messages;
  if (typeof input === 'string') messages = [{ role: 'user', content: input }];
  else if (Array.isArray(input) && input.length) messages = input.map(t => ({ role: t.role === 'assistant' ? 'assistant' : 'user', content: String(t.content || '') }));
  else return json({ error: 'Brak treści zapytania' }, 400);
  const size = messages.reduce((n, m) => n + m.content.length, 0);
  if (size > MAX_INPUT) return json({ error: 'Za długie zapytanie' }, 413);

  if (!Array.isArray(images)) images = [];
  images = images.slice(0, 2).filter(im => im && typeof im.data === 'string' && im.data.length < MAX_IMAGE_B64 && /^image\/(jpeg|png|webp|gif)$/.test(im.media_type || ''));
  const last = messages[messages.length - 1];
  if (images.length && last.role === 'user') {
    last.content = [...images.map(im => ({ type: 'image', source: { type: 'base64', media_type: im.media_type, data: im.data } })), { type: 'text', text: last.content }];
  }

  const model = tier === 'quick' ? (env.MODEL_QUICK || 'claude-haiku-4-5-20251001') : (env.MODEL_DEFAULT || 'claude-sonnet-5-5');
  const payload = {
    model,
    max_tokens: Math.min(+env.MAX_TOKENS || 2500, 4000),
    messages,
    system: wantJson ? 'Odpowiadaj wyłącznie poprawnym JSON-em, bez komentarzy i bez bloków kodu. Respond with valid JSON only.' : undefined,
  };

  let r;
  try {
    r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify(payload),
    });
  } catch (e) { return json({ error: 'Brak połączenia z Claude API' }, 502); }

  const data = await r.json().catch(() => null);
  if (r.status === 429) return json({ error: 'Limit zapytań Claude API' }, 429);
  if (!r.ok || !data) return json({ error: (data && data.error && data.error.message) || ('Claude API: HTTP ' + r.status) }, 502);
  const text = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
  return json({ text, truncated: data.stop_reason === 'max_tokens', model: data.model });
}
