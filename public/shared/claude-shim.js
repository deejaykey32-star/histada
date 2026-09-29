/* HISTADA – zamiennik window.claude poza claude.ai (Cloudflare Pages).
 * Gry pytają o możliwości przez window.claude.use(nazwa) i działają bez nich, gdy dostaną null.
 * Tutaj:
 *   downloads – zapis pliku przez zwykłe pobieranie w przeglądarce,
 *   sample    – Claude przez funkcję /api/claude (tylko gdy na serwerze jest ustawiony ANTHROPIC_API_KEY),
 *   db, room, user – brak (null): gra zapisuje postęp w localStorage, Krąg działa w trybie jednoosobowym.
 */
(function () {
  if (window.claude && window.claude.use) return; // wewnątrz claude.ai zostaje oryginał
  var API = '/api/claude';
  var status = null; // Promise<{ok, images, access}>
  function probe() {
    if (!status) status = fetch(API, { method: 'GET', headers: { accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : { ok: false }; })
      .catch(function () { return { ok: false }; });
    return status;
  }
  // kod dostępu można podać raz w adresie: https://twoja-strona/?kod=XYZ
  try { var q = new URLSearchParams(location.search).get('kod'); if (q) { localStorage.setItem('histada.kod', q); history.replaceState(null, '', location.pathname + location.hash); } } catch (e) {}
  function code() { try { return localStorage.getItem('histada.kod') || ''; } catch (e) { return ''; } }
  function err(c, m) { var e = new Error(m || c); e.code = c; return e; }
  function toB64(blob) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { var s = String(fr.result); res({ media_type: blob.type || 'image/jpeg', data: s.slice(s.indexOf(',') + 1) }); };
      fr.onerror = function () { rej(err('bad_image')); };
      fr.readAsDataURL(blob);
    });
  }
  async function call(input, opts, json) {
    opts = opts || {};
    var imgs = opts.images ? (Array.isArray(opts.images) ? opts.images : [opts.images]) : [];
    var images = [];
    for (var i = 0; i < imgs.length; i++) images.push(await toB64(imgs[i]));
    var r;
    try {
      r = await fetch(API, {
        method: 'POST', signal: opts.signal,
        headers: { 'content-type': 'application/json', 'x-histada-code': code() },
        body: JSON.stringify({ input: input, images: images, tier: opts.modelTier || 'default', json: !!json })
      });
    } catch (e) {
      if (e && e.name === 'AbortError') throw err('cancelled');
      throw err('network', 'Brak połączenia z serwerem');
    }
    var data = null; try { data = await r.json(); } catch (e) {}
    if (r.status === 401) throw err('not_granted', 'Potrzebny kod dostępu');
    if (r.status === 429) throw err('rate_limited', 'Za dużo zapytań – spróbuj za chwilę');
    if (!r.ok || !data) throw err('failed', (data && data.error) || ('HTTP ' + r.status));
    var text = data.text || '';
    if (opts.onText) { try { opts.onText({ text: text, delta: text }); } catch (e) {} }
    return { text: text, truncated: !!data.truncated };
  }
  function parseJSON(t) {
    t = String(t).trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
    try { return JSON.parse(t); } catch (e) {}
    var a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) {} }
    var c = t.indexOf('['), d = t.lastIndexOf(']');
    if (c >= 0 && d > c) return JSON.parse(t.slice(c, d + 1));
    throw err('bad_json', 'Odpowiedź nie jest poprawnym JSON-em');
  }
  function makeSample(info) {
    var s = function (input, opts) { return call(input, opts, false); };
    s.json = function (input, opts) { return call(input, opts, true).then(function (r) { return parseJSON(r.text); }); };
    s.limits = function () { return Promise.resolve({ images: !!info.images }); };
    return Object.freeze(s);
  }
  var downloads = Object.freeze({
    save: function (o) {
      return new Promise(function (res, rej) {
        try {
          var blob = o.data instanceof Blob ? o.data : new Blob([o.data]);
          var url = URL.createObjectURL(blob), a = document.createElement('a');
          a.href = url; a.download = o.filename || 'histada'; document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 4000); res({ ok: true });
        } catch (e) { rej(err('failed')); }
      });
    }
  });
  var cache = {};
  window.claude = Object.freeze({
    use: function (name) {
      if (cache[name]) return cache[name];
      var p;
      if (name === 'downloads') p = Promise.resolve(downloads);
      else if (name === 'sample') p = probe().then(function (st) { return st && st.ok ? makeSample(st) : null; });
      else p = Promise.resolve(null);
      return (cache[name] = p);
    }
  });
})();
