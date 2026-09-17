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

### Performance (valutati, non fatti)
- [ ] Font: 11 file PP Monument dichiarati, corsivi/Thin poco usati – deciso di lasciarli per ora
- Icone: 3 librerie (react-icons, iconify, lucide) volute, servono tutte

### Pulizia codice
- [ ] `roomlayout.jsx`: `PillInfo` e `ServiceDotList` sono componenti dichiarati dentro il render (3 errori eslint preesistenti, possono resettare lo stato)
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
- [ ] `README.md` è quello standard di create-next-app
- [ ] Nessun test automatico
- [ ] `.gitignore` contiene ancora la sezione `.vercel` (residuo del template, il sito è su Netlify)

### Setup tecnico (rimandato)
- [ ] Netlify CLI non installata / progetto non collegato (serve solo per log deploy, variabili, anteprime).

## Domande / decisioni in sospeso
- Soul Room: 3ª foto della galleria senza versione desktop (it/en)
- Cloudinary: controllare i crediti di trasformazione in dashboard dopo il deploy
- `sectionBplus.subHeadline`: inserita bozza di mini copy (it/en) da confermare · `sectionBplus.note` ancora vuota
- **Tipo letto camere**: ora nel campo `bed` di ogni camera (it.json/en.json), tutte ancora "Double". Confermare il letto della Soul Room (1 persona) e delle altre, poi aggiornare. Allineare anche Google Business (fuori dal codice).
- Capienza massima camere da allineare in WordPress/MotoPress quando verrà ricollegato (oggi non collegato, non urgente)
- I template email nella root sono allineati con quelli attivi su WordPress?

## Completato
- 2026-09-17 – Immagini camere: deciso di lasciare invariate Blessing e Soul (incluse le loro foto noPieghe). Sostituzioni fatte solo per Heart e Breath
- 2026-09-17 – Breath Room: foto noPieghe sostituite con versioni "no_bad" (ph_03, desk_03, desk_04) in it.json ed en.json
- 2026-09-17 – Heart Room: galleria inglese resa identica all'italiana (tolte heart_ph_01_noPieghe e heart_ph_04, solo mobile). Ora tutte le gallery it/en coincidono
- 2026-09-17 – Heart Room: foto sostituite con le versioni "no_bed" (ph_05, ph_07, desk_01, desk_02, desk_04, desk_06) in it.json ed en.json. ph_03, ph_02, ph_06, desk_03 invariate
- 2026-09-17 – Immagini: ottimizzate solo da Cloudinary (`lib/cloudinaryLoader.js`: f_auto, q, w, c_limit) in `SmartBackground`, sfondo menu e scheda camera del booking (prima `<img>` con originale 2,5–4 MB). Loghi locali del footer restano a Next. Es. foto desktop Heart 2,5 MB → 147 KB WebP
- 2026-09-17 – Performance: splash screen accorciato (~3,3s → ~1,6s). Nuova `clientDictionary()` in `lib/dictionary.js` toglie termini/privacy/cookie/esperienze dal dizionario passato ai componenti client: HTML gzip home 77→50 KB, camera 48→21, contatti 54→27, booking 47→20, esperienze 53→32
- 2026-09-17 – Home: `SectionBplus` ("Le nostre camere") con la stessa impaginazione della vista iniziale di `SectionD`, senza bottoni. Nuovi campi `sectionBplus.subHeadline` e `sectionBplus.note` (vuoti, it/en)
- 2026-09-17 – Cambio lingua: niente splash screen e menu che resta aperto se il cambio avviene dal menu (segnale una tantum `langSwitch` in sessionStorage: `langSwitcher.jsx`, `navbar.jsx`, `splashScreen.jsx`)
- 2026-09-17 – Pagina camera (desktop): lo stato "Scopri" (pannello info) è salvato nell'URL `?info=1` e resta aperto cambiando lingua. `langSwitcher.jsx` ora mantiene i parametri dell'URL al cambio lingua (vale anche per le date in `/booking`)
- 2026-09-17 – Pagina camera: pillola prezzo senza manina all'hover (`cursor-default` sui due BtnBase del prezzo in `roomlayout.jsx`)
- 2026-09-17 – Pulsante "Prenota" (`bookingNav.jsx`): con `BOOKING_SYSTEM_ACTIVE = false` apre solo Booking.com e non espande più la barra date/ospiti. Da mettere `true` quando WordPress sarà ricollegato
- 2026-09-17 – Primo commit con Claude (`8d7423a`) e push su `main` riuscito: modifiche camere, telefono, CLAUDE.md, STATUS.md, `.gitignore` ora tracciato
- 2026-09-17 – Tipo/numero letti spostato da valore fisso in `jsonLd.js` al campo `bed` di ogni camera nei JSON
- 2026-09-17 – Creati CLAUDE.md e STATUS.md
- 2026-09-17 – Aggiunto "circa" / "approx." alla pillola mq delle camere (it.json, en.json)
- 2026-09-17 – Capienza camere: Soul 1 persona, Heart/Breath/Blessing 2 persone (pillole it/en). `jsonLd.js` ora legge l'occupancy SEO dalla pillola invece del valore fisso 2
- 2026-09-17 – Blessing Room, testo carosello: "suite tripla" → "suite doppia" / "triple suite" → "double suite" (la camera è per 2 persone)
- 2026-09-17 – Corretti i mq delle camere: Heart 23→20, Breath 23→22, Soul 18→14, Blessing 21→18 (it.json, en.json)
- 2026-09-17 – Secondo numero del footer (`cellTwo`) corretto da +39 3486497297 a +39 3486487297 (it.json, en.json). Il numero principale +39 3333597947 resta invariato.
- 2026-09-17 – Git configurato: push con account `tatianaperenzin-rgb` (login verificato), autore commit Elia Schneider fissato in locale, cronologia non riscritta
