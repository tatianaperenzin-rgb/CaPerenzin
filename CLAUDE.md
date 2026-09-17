# Ca'Perenzin – sito web

Sito vetrina del B&B **Ca'Perenzin** (Tarzo, Colline del Prosecco) – dominio `caperenzin.it`.
Il sito è la vetrina; **prenotazioni, pagamenti ed email di conferma** vivono su un WordPress separato
(`admin.caperenzin.it`) con il plugin **MotoPress Hotel Booking**.

> Questo file descrive **com'è fatto il progetto e le regole di lavoro** (cose stabili).
> Problemi aperti, cose da fare e decisioni in sospeso stanno in **[STATUS.md](STATUS.md)**.

## Comandi
```bash
npm install      # dipendenze
npm run dev      # sviluppo su http://localhost:3000 (redirect a /it)
npm run build    # build di produzione – eseguirlo prima di dichiarare finita una modifica
npm run lint     # eslint
```
Non ci sono test automatici. Repo GitHub: `tatianaperenzin-rgb/CaPerenzin` (branch `main`).
Hosting: **Netlify** (deploy dal branch `main`).
Git: push con l'account GitHub `tatianaperenzin-rgb`; autore dei commit **Elia Schneider** (configurato in locale nel repo).
**Un solo ramo: `main`.** Niente branch di lavoro: si committa e si pusha sempre lì.

## Dove si lavora: VS Code (locale) e Claude Code sul web (cloud)

Il progetto si può portare avanti da due posti diversi. **Non sono collegati fra loro: l'unico punto
di incontro è GitHub.**

| | VS Code sul PC di Elia | Claude Code sul web |
|---|---|---|
| Dove girano i file | disco locale | container nel cloud, clone del repo fatto all'avvio |
| Visibilità | Claude vede il disco e `localhost:3000` | Claude vede **solo** quello che è su GitHub |
| Durata | permanente | temporanea: a fine sessione il container viene buttato via |

Conseguenze pratiche:
- **Le modifiche fatte in locale e non pushate, dalla sessione web non si vedono.** Prima di far lavorare
  Claude sul web: `git push` da VS Code. E dopo che ha lavorato: `git pull origin main` sul PC, altrimenti
  al commit successivo le due copie divergono.
- **Nella sessione web committare e pushare non è opzionale:** è l'unico modo di non perdere il lavoro,
  perché il container sparisce. Vale comunque la regola "nessun commit/push senza richiesta esplicita":
  a fine lavoro va chiesto.
- **La sessione web non è la stessa chat di quella locale.** La memoria condivisa fra le due sono
  `CLAUDE.md` e `STATUS.md`: per questo vanno tenuti aggiornati.
- **Ogni push su `main` fa partire il deploy Netlify**, da qualsiasi postazione. Non c'è un ramo di
  sicurezza in cui guardare prima di pubblicare: `npm run build` prima di ogni push non è una formalità.

**Firma dei commit fatti dalla sessione web.** GitHub li mostra "Verified" solo se il *committer* è
`Claude <noreply@anthropic.com>`. L'*autore* però è un campo separato e resta Elia, così nella
cronologia si legge chi ha voluto la modifica e si distingue da quelle scritte a mano:
```bash
git config user.name  "Claude"                 # committer (serve per la firma)
git config user.email "noreply@anthropic.com"
git commit --author="Elia Schneider (Claude) <elyssch@gmail.com>" -m "..."
```
L'opzione `--author` va ripetuta a ogni commit: non esiste un equivalente in `git config`.

Per aggiornare la copia locale con il lavoro fatto dalla sessione web:
```bash
git pull origin main
npm run dev
```

## Stack
- Next.js 16 (App Router) + React 19, **JavaScript** (no TypeScript), `reactCompiler: true`
- Tailwind CSS 4 (configurato in `src/app/globals.css`, nessun `tailwind.config`) + componenti shadcn/ui in `src/components/ui/uiShadcn/`
- Animazioni: GSAP, Framer Motion, Lenis, Embla Carousel
- Media su Cloudinary. Le immagini Cloudinary sono ottimizzate **da Cloudinary**, non da Next: usare `loader={cloudinaryLoader}` (`@/lib/cloudinaryLoader`) con `next/image`/`getImageProps` (già dentro `SmartBackground`), oppure `cloudinaryLoader({ src, width, quality })` per un `<img>` semplice. Le immagini locali in `public/` restano all'ottimizzatore di Next
- Email contatti: Resend + reCAPTCHA v3 · Mappa: Google Maps · Cookie banner: Termly
- Alias import: `@/*` → `src/*`

## Struttura
```
src/app/
  page.js                  redirect a /it
  [lang]/layout.js         layout principale: font, metadata SEO, NavBar, provider, Termly
  [lang]/page.js           home – sezioni A…O (molte caricate con next/dynamic)
  [lang]/camere/[slug]/    pagina camera (dati da dictionary.dataRooms)
  [lang]/booking/          risultati disponibilità (server-side, legge i calendari .ics)
  [lang]/experiences, contatti, policy, cookie, termsofuse
  [lang]/mail/             anteprima email (noindex)
  api/room-availability    date occupate dai file .ics di WordPress
  api/room-price           prezzo base dall'API MotoPress (/wp-json/mphb/v1/rates)
  api/wp-booking           ricava il form di checkout WordPress (scraping HTML)
  sitemap.js, robots.js, not-found.js
src/dictionaries/it.json, en.json   TUTTI i testi + dati delle camere
src/components/            home/, room/, ui/, ui/booking/, contacts/, experience/, seo/, image/
src/hooks/                 contexUi.js (stato UI), bookingContext.js (date/ospiti), sendEmail.js (server action)
src/lib/                   dictionary.js, availability.js, utility.js (cn)
```
Nota: `src/components/empty/` NON contiene componenti vuoti – `bubbleTest`, `SectionEF`, `SectionIL`, `sectionNO` sono usati dalla home.

File nella root che **non fanno parte di Next.js** ma sono materiale da incollare in WordPress:
`email_*_template.html`, `motopress-mail-template.css`, `wp-checkout-custom.css`, `wordpress_loader.html`.

## Lingue e testi (regola principale)
- Lingue: `it` (default) e `en`, gestite dal segmento `[lang]`. Nessuna libreria i18n.
- I testi **non** si scrivono nei componenti: stanno in `src/dictionaries/it.json` e `en.json`,
  caricati con `getDictionary(lang)` (solo lato server) e passati ai componenti come prop `dictionary`.
- **Ogni modifica di testo va fatta in entrambi i file**, mantenendo le stesse chiavi e la stessa struttura.
- **Passaggio ai componenti client:** usare `clientDictionary(dictionary)` (da `@/lib/dictionary`) invece del dizionario intero.
  Toglie le sezioni pesanti `terms`, `privacy`, `cookie`, `experiences`, che altrimenti finiscono nell'HTML di ogni pagina.
  Se un componente client ne ha bisogno: `clientDictionary(dictionary, ["experiences"])`.
- Le chiavi tipo `"----"` o `"__TEXT.SECTION__A__"` sono solo separatori visivi: non usarle e non rimuoverle.
- Varianti CSS per lingua disponibili: `it:` e `en:` (definite in `globals.css`).

## Camere
Le 4 camere sono in `dictionary.dataRooms` (Heart, Breath, Soul, Blessing). Campi chiave:
- `slug` → URL `/[lang]/camere/[slug]` e sitemap
- `wpTypeId` → ID tipo alloggio MotoPress (17 breath, 20 soul, 22 blessing, 24 heart)
- `infoPills[0].labelOne` → numero persone (usato anche per l'occupancy SEO) · `bed` → tipo e numero letti per i dati SEO (`typeOfBed` schema.org, in inglese in entrambi i JSON)
- `icsUrl` → calendario disponibilità · poi `motopressId`, `bookingUrl`, `gallery`, `infoPills`, `service`

Se cambia un ID in WordPress va aggiornato in **entrambi i JSON** e in `WP_SLUG_MAP` in `src/app/api/wp-booking/route.js`.

## Flusso di prenotazione (zona delicata)
1. L'utente sceglie date/ospiti (`BookingProvider`, salvato in `sessionStorage`).
2. Ricerca generica → `/[lang]/booking` → `lib/availability.js` filtra le camere libere dai file .ics.
3. Prenotazione di una camera → `ui/booking/bookingNav.jsx` chiama `/api/wp-booking`, che legge l'HTML delle pagine
   WordPress per estrarre nonce e campi hidden; poi il browser invia un POST al checkout WordPress in una nuova scheda.
4. La lingua viene passata a WordPress con cookie/campo `customer_lang`.

**Stato attuale:** WordPress non è collegato. In `ui/booking/bookingNav.jsx` la costante `BOOKING_SYSTEM_ACTIVE = false`
fa sì che il pulsante "Prenota" apra solo Booking.com senza espandere la barra. Con `true` torna il flusso sopra.

Lo step 3 dipende dal markup HTML di MotoPress: **non modificarlo senza testare una prenotazione reale end-to-end**.
Qualsiasi cambio lato WordPress (plugin, tema, slug) può romperlo.

## Design
- Tema scuro: sfondo `#0B0B0B`, testo panna `#E8E6D9`, oro `#B08D55` (variabili in `globals.css`, classi `bg-gold`, `text-gold`)
- Font: PP Monument Extended (default) e Muller Next (`--font-MullerNext`), file in `src/app/fonts/`
- Classi condizionali con `cn()` da `@/lib/utility`

## Variabili d'ambiente (`.env`, mai committato)
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`,
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `RESEND_KEY`, `MOTOPRESS_CK`, `MOTOPRESS_CS`, `NEXT_PUBLIC_WP_URL`.
Le stesse vanno configurate su Netlify. Non stampare mai i valori.

## Regole di lavoro
- Seguire lo stile del codice esistente (JS, componenti `.jsx`, commenti in italiano).
- Pagine come server component; `"use client"` solo dove serve interattività.
- SEO: ogni nuova pagina deve avere `generateMetadata` con `alternates` it/en ed essere aggiunta a `sitemap.js`.
- Dopo una modifica: `npm run build` deve passare.
- Nessun commit/push senza richiesta esplicita.
- Quando si risolve o si scopre un problema → aggiornare **STATUS.md**.
  Quando cambia la struttura o una regola → aggiornare **questo file**.
