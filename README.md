# HISTADA · Trylogia

Edukacyjna gra w trzech częściach + zestaw do druku, gotowa do wdrożenia na **Cloudflare Pages** z repozytorium **GitHub**.

| Adres | Co to jest |
|---|---|
| `/` | strona startowa trylogii |
| `/gra/` | część 1 – rozgrywka planszowa (1–12 graczy, plansza 2D/3D, tryb planszy fizycznej) |
| `/krag/` | część 2 – W Kręgu Tajemnicy |
| `/diament/` | część 3 – Cyfrowy Diament |
| `/druk/` | gra do wydruku: plansza, karty, kartoniki, kości, pionki, 432 karty opowieści (PL i EN) |

Wszystko jest statyczne (HTML + pliki do druku). Jedyny kod serwerowy to `functions/api/claude.js` – pośrednik do Claude API dla trybów AI.

## Struktura

```
public/                 ← katalog publikowany przez Cloudflare Pages
  index.html            strona startowa
  gra/ krag/ diament/   trzy gry (każda to jeden plik index.html)
  druk/                 strona do druku + PDF/PNG/SVG
  shared/claude-shim.js zastępuje window.claude z claude.ai (pobieranie plików, Claude przez /api/claude)
  _headers  404.html  robots.txt
functions/api/claude.js Pages Function – pośrednik do Claude API (klucz zostaje na serwerze)
wrangler.toml           nazwa projektu i katalog wyjściowy (public)
docs/deploy-wrangler.yml.example   alternatywne wdrożenie przez GitHub Actions
```

## Wdrożenie krok po kroku

1. **GitHub** – utwórz nowe repozytorium (np. `histada`) i wypchnij zawartość tego folderu:
   ```bash
   git init
   git add .
   git commit -m "HISTADA – pierwsza wersja"
   git branch -M main
   git remote add origin https://github.com/TWOJ-LOGIN/histada.git
   git push -u origin main
   ```
2. **Cloudflare** → *Workers & Pages* → *Create* → zakładka *Pages* → *Connect to Git* → wybierz repozytorium.
3. Ustawienia budowania:
   - *Framework preset*: **None**
   - *Build command*: **(puste)**
   - *Build output directory*: **`public`**
4. *Save and Deploy*. Po chwili strona działa pod `https://histada.pages.dev` (albo podobnym adresem). Każdy `git push` na `main` wdraża nową wersję, a inne gałęzie dostają adresy podglądu.
5. (Opcjonalnie) *Custom domains* → podłącz własną domenę.

## Tryby z Claude (opcjonalne)

Bez klucza API gry działają w pełni offline: pytania i opowieści Histady pochodzą z wbudowanego banku (4 284 pytania, 432 opowieści PL/EN). Klucz włącza dodatkowo:

- nowe opowieści i pytania pisane przez Claude dla każdego pola (gra planszowa, tryb „Claude: nowa historia…”),
- rozpoznawanie pola, kości i karty ze zdjęcia (tryb planszy fizycznej),
- pytania do Histady w czacie pomocy.

Konfiguracja: projekt Pages → *Settings* → *Variables and Secrets* (środowisko *Production*):

| Zmienna | Typ | Opis |
|---|---|---|
| `ANTHROPIC_API_KEY` | **Secret** | klucz z console.anthropic.com – wymagany dla trybów AI |
| `ACCESS_CODE` | Secret, opcjonalny | kod dostępu; gracze otwierają stronę raz z `?kod=TWÓJ-KOD`, kod zapisuje się w przeglądarce |
| `ALLOWED_ORIGINS` | tekst, opcjonalny | dodatkowe domeny (po przecinku), z których wolno wołać API |
| `MODEL_DEFAULT` | tekst, opcjonalny | domyślnie `claude-sonnet-5-5` |
| `MODEL_QUICK` | tekst, opcjonalny | domyślnie `claude-haiku-4-5-20251001` |
| `MAX_TOKENS` | liczba, opcjonalna | limit długości odpowiedzi (domyślnie 2500, maks. 4000) |

Po zmianie zmiennych zrób *Retry deployment* (albo nowy push), żeby weszły w życie.

**Koszty i bezpieczeństwo.** Każde zapytanie AI płaci właściciel klucza. Endpoint jest publiczny, więc:
- ustaw `ACCESS_CODE`, jeśli strona ma być otwarta dla wszystkich,
- ustaw limit wydatków w konsoli Anthropic,
- rozważ regułę *Rate limiting* w Cloudflare (WAF) dla ścieżki `/api/claude`.

## Uruchomienie lokalne

```bash
npm install
cp .dev.vars.example .dev.vars   # wpisz klucz, jeśli chcesz testować tryby AI
npm run dev                      # http://localhost:8788
```

Ręczne wdrożenie bez GitHuba: `npx wrangler login` i `npm run deploy`.

## Co działa inaczej niż na claude.ai

| Funkcja | claude.ai (artefakty) | Cloudflare Pages |
|---|---|---|
| Rozgrywka, bank pytań, opowieści, 3D, certyfikaty PDF | ✔ | ✔ |
| Zapis postępu | baza artefaktu + przeglądarka | przeglądarka (localStorage) |
| Pobieranie plików | okno potwierdzenia | zwykłe pobieranie |
| Tryby Claude | konto oglądającego | klucz właściciela strony (`/api/claude`) |
| Krąg: gracze na żywo, czat, quiz grupowy, ranking | ✔ | ✘ na razie tylko tryb jednoosobowy |

Gracze na żywo w Kręgu wymagają serwera czasu rzeczywistego (np. Cloudflare Durable Objects) – to osobny, większy krok.

## Aktualizacja treści

Pliki w `public/` są wynikiem buildów projektu (szablony, bank pytań, generatory kart). Po zmianach w źródłach zbuduj je ponownie i podmień pliki w `public/`, potem `git commit` i `git push`.

---
Pytania w banku i opowieści napisał i przejrzał Claude; nie zostały jeszcze sprawdzone przez człowieka ani ze źródłami.
