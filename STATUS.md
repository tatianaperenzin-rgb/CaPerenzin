# STATUS – Ca'Perenzin

Stato del progetto: lavori in corso, problemi aperti, decisioni in sospeso.
Struttura e regole stabili sono in [CLAUDE.md](CLAUDE.md).

_Ultimo aggiornamento: 2026-09-17 – analisi iniziale del progetto_

## In corso
_Nessun lavoro in corso._

## Problemi aperti

### Priorità alta
- [ ] **Email contatti: input non sanificato** – `src/hooks/sendEmail.js` inserisce `name`, `email`, `phone`, `message` direttamente nell'HTML dell'email. Fare escape dei valori.
- [ ] **reCAPTCHA senza secret** – se `RECAPTCHA_SECRET_KEY` manca, il codice logga e prosegue comunque verso Google. Rendere esplicito il comportamento.
- [ ] **Flusso `api/wp-booking` fragile** – basato su scraping HTML di MotoPress. Valutare alternativa più robusta o almeno un controllo periodico.

### Pulizia codice
- [ ] Componenti mai importati: `contacts/contactForm.jsx`, `empty/test.jsx`, `empty/testD.jsx`, `form/contattiPage.jsx`, `icons/icons.jsx`, `smoothScroll.jsx`
- [ ] `src/app/layotu.js` – refuso di "layout", verificare e rimuovere
- [ ] Cartella `src/components/empty/` con nome fuorviante (contiene componenti usati dalla home)
- [ ] `console.log` di debug attivi in produzione (bookingNav, api/room-price, api/wp-booking, bookingContext, sendEmail)
- [ ] `ui/booking/bookingNav.jsx`: campi `mphb_children` e `mphb_rooms_details[0][adults]` aggiunti due volte
- [ ] Home `[lang]/page.js`: due sezioni con lo stesso `id="breakfast"` (desktop e mobile)
- [ ] `api/room-availability`: `next: { revalidate: 60 }` e `cache: 'no-store'` insieme si contraddicono
- [ ] `fix_hydration.ps1` nella root: script usato una volta, valutare rimozione
- [ ] File WordPress sparsi nella root (`email_*_template.html`, `*.css`, `wordpress_loader.html`) → spostare in una cartella dedicata (es. `wordpress/`)
- [ ] File d'esempio Next.js inutilizzati in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)

### Repo e documentazione
- [ ] `.gitignore` non ancora tracciato da git
- [ ] `README.md` è quello standard di create-next-app
- [ ] Nessun test automatico
- [ ] `.gitignore` contiene ancora la sezione `.vercel` (residuo del template, il sito è su Netlify)

### Setup tecnico (rimandato)
- [ ] Netlify CLI non installata / progetto non collegato (serve solo per log deploy, variabili, anteprime).

## Domande / decisioni in sospeso
- **Tipo letto camere**: ora nel campo `bed` di ogni camera (it.json/en.json), tutte ancora "Double". Confermare il letto della Soul Room (1 persona) e delle altre, poi aggiornare. Allineare anche Google Business (fuori dal codice).
- Capienza massima camere da allineare in WordPress/MotoPress quando verrà ricollegato (oggi non collegato, non urgente)
- I template email nella root sono allineati con quelli attivi su WordPress?

## Completato
- 2026-09-17 – Tipo/numero letti spostato da valore fisso in `jsonLd.js` al campo `bed` di ogni camera nei JSON
- 2026-09-17 – Creati CLAUDE.md e STATUS.md
- 2026-09-17 – Aggiunto "circa" / "approx." alla pillola mq delle camere (it.json, en.json)
- 2026-09-17 – Capienza camere: Soul 1 persona, Heart/Breath/Blessing 2 persone (pillole it/en). `jsonLd.js` ora legge l'occupancy SEO dalla pillola invece del valore fisso 2
- 2026-09-17 – Blessing Room, testo carosello: "suite tripla" → "suite doppia" / "triple suite" → "double suite" (la camera è per 2 persone)
- 2026-09-17 – Corretti i mq delle camere: Heart 23→20, Breath 23→22, Soul 18→14, Blessing 21→18 (it.json, en.json)
- 2026-09-17 – Secondo numero del footer (`cellTwo`) corretto da +39 3486497297 a +39 3486487297 (it.json, en.json). Il numero principale +39 3333597947 resta invariato.
- 2026-09-17 – Git configurato: push con account `tatianaperenzin-rgb` (login verificato), autore commit Elia Schneider fissato in locale, cronologia non riscritta
