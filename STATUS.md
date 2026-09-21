# STATUS – Ca'Perenzin

Stato del progetto: lavori in corso, problemi aperti, decisioni in sospeso.
Struttura e regole stabili sono in [CLAUDE.md](CLAUDE.md).

_Ultimo aggiornamento: 2026-09-17 – fine sessione (ultimo commit `e27c082`)_

## In corso
_Nessun lavoro in corso._

## Da riprendere alla prossima sessione
- [ ] **Verificare online dopo il deploy** (commit `e27c082`): inviare un messaggio vero dalla pagina Contatti di caperenzin.it (unico test con reCAPTCHA reale) e controllare che arrivi in Gmail
- [ ] **Netlify:** controllare che `RESEND_KEY` e `RECAPTCHA_SECRET_KEY` siano impostate (senza la chiave reCAPTCHA il modulo ora si blocca)
- [ ] **Titolo "Le nostre camere"** (`sectionBplus.jsx`): la classe `mt-[-70]` è senza unità e Tailwind non la applica (es. `mt-[-70px]`)
- [ ] **Pulizia radice:** spostare i file WordPress (`email_*_template.html`, `motopress-mail-template.css`, `wp-checkout-custom.css`, `wordpress_loader.html`, `public/email-preview.html`) in una cartella `wordpress/`
- [ ] **Documentazione:** riscrivere `README.md` (cos'è il sito, avvio, testi nei JSON, WordPress/Cloudinary/Netlify, rimando a CLAUDE.md) e togliere `.vercel` da `.gitignore`
- [ ] **Codice inutilizzato:** rimuovere i componenti mai importati, `src/app/layotu.js`, `fix_hydration.ps1`, file d'esempio in `public/`

## Problemi aperti

### Priorità alta
- [ ] **Immagine rotta sul sito online:** `breath_desk_02_pvhjxk` (Breath Room, `gallery[2].bkDesk` in it.json ed en.json, riga 578) è stata cancellata per errore da Cloudinary il 2026-09-21 durante la pulizia delle foto orfane. Va ricaricata su Cloudinary con lo stesso public_id (cartella "Breath Room"): l'URL nei dizionari contiene un numero di versione ma Cloudinary lo tratta come anti-cache, quindi non serve toccare il codice. Copia originale sul PC di Elia. Nessun backup recuperabile: piano Free, l'API risponde "Resource not found". Verifica incrociata fatta: è l'unico riferimento rotto su 74 immagini citate dal sito

### Performance (valutati, non fatti)
- [ ] Font: 11 file PP Monument dichiarati, corsivi/Thin poco usati – deciso di lasciarli per ora
- Icone: 3 librerie (react-icons, iconify, lucide) volute, servono tutte

### Pulizia codice
- [ ] Componenti mai importati: `contacts/contactForm.jsx`, `empty/test.jsx`, `empty/testD.jsx`, `form/contattiPage.jsx`, `icons/icons.jsx`, `smoothScroll.jsx`
- [ ] `src/app/layotu.js` – refuso di "layout", verificare e rimuovere
- [ ] Cartella `src/components/empty/` con nome fuorviante (contiene componenti usati dalla home)
- [ ] `ui/booking/bookingNav.jsx`: campi `mphb_children` e `mphb_rooms_details[0][adults]` aggiunti due volte
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
- **Quando riapriamo WordPress / MotoPress:** il flusso `api/wp-booking` legge l'HTML delle pagine MotoPress per ricavare nonce e form di checkout (scraping): un aggiornamento del plugin o del tema può romperlo. Valutare l'API ufficiale MotoPress e testare una prenotazione reale end-to-end prima di mettere `BOOKING_SYSTEM_ACTIVE = true`. Allineare anche la capienza camere
- Soul Room: 3ª foto della galleria senza versione desktop (it/en)
- Cloudinary: controllare i crediti di trasformazione in dashboard dopo il deploy
- `sectionBplus.subHeadline`: inserita bozza di mini copy (it/en) da confermare · `sectionBplus.note` ancora vuota
- **Tipo letto camere**: ora nel campo `bed` di ogni camera (it.json/en.json), tutte ancora "Double". Confermare il letto della Soul Room (1 persona) e delle altre, poi aggiornare. Allineare anche Google Business (fuori dal codice).
- Capienza massima camere da allineare in WordPress/MotoPress quando verrà ricollegato (oggi non collegato, non urgente)
- I template email nella root sono allineati con quelli attivi su WordPress?

## Completato
- 2026-09-21 – Cloudinary: cancellate 11 foto orfane delle camere Heart e Breath (le versioni con il letto singolo, sostituite a settembre). Restavano pubbliche e indicizzate da Google Immagini pur non essendo più citate dal sito: togliere il riferimento non cancella il file, e Google le toglie solo quando l'URL smette di rispondere. Cancellate con `invalidate` per svuotare anche la cache CDN. Nota: le foto caricate su Booking.com e Google Business sono copie separate, lì vanno sostituite a mano
- 2026-09-21 – Footer, targa CSR: la striscia dei 4 loghi è ora un unico link che apre `public/targa-csr-caperenzin.pdf` in una nuova scheda (`target="_blank"` + `rel="noopener noreferrer"`, nessuna rotta: è un file statico). Richiesta di Impresa Verde Treviso-Belluno via Digital Media Solutions. Etichetta per screen reader nella chiave `footer.regionalText` (it/en), che era un segnaposto `[regional Text]` mai usato. Aggiunta una leggera opacità all'hover, prima i loghi non davano nessun segnale di essere cliccabili
- 2026-09-21 – Footer, spaziatura dei 4 loghi: in `sectionO.jsx:76` `regionalLogoClass` aveva `md:h-10` scritto due volte e non aveva `md:w-10`, così da tablet in su i due PNG stavano in una cassetta 64×40 invece che 40×40. Ora i quattro loghi sono allineati in modo coerente
- 2026-09-21 – Footer, logo "Sviluppo Rurale Veneto": l'emblema (albero) non si vedeva, restava solo il testo. `RegionalLogo` è montato tre volte (smartphone/tablet/desktop) e tutte e tre le copie del logo dichiaravano il gradiente con lo stesso `id="SVGID_1_"` (nome generico dell'export Illustrator): `url(#SVGID_1_)` risolveva sempre alla prima copia del documento, che al breakpoint corrente è nascosta, e l'emblema restava senza colore. Ora l'id è generato con `React.useId()` (`sviluppoRuraleVeneto.jsx`). Verificato nella pagina viva a 390/820/1440 px; `npm run build` passa
- 2026-09-17 – Modulo contatti: il mittente senza indirizzo veniva rifiutato da Resend (le email del form non partivano). Ora `from` = `Contatto dal sito Ca Perenzin <info@caperenzin.it>` (dominio verificato su Resend, stesso mittente di WP Mail SMTP). Test reale: Resend "Delivered" a info@caperenzin.it, replyTo corretto, HTML inserito mostrato come testo. Confermato arrivo in Gmail, posta in arrivo (non spam)
- 2026-09-17 – Modulo contatti (`hooks/sendEmail.js`): campi ripuliti prima di entrare nell'HTML dell'email, validazione lato server (obbligatori, lunghezze, formato email), `replyTo` corretto (prima `reply_to` veniva ignorato), errori di Resend ora gestiti (prima il form diceva "inviato" anche se l'invio falliva)
- 2026-09-17 – reCAPTCHA: senza `RECAPTCHA_SECRET_KEY` l'invio viene bloccato esplicitamente; parametri inviati a Google con encoding corretto
- 2026-09-17 – `api/room-availability`: accetta solo calendari dell'host WordPress (protezione SSRF) e cache coerente (`revalidate: 60`, tolto `no-store` che la annullava)
- 2026-09-17 – Rimossi 26 `console.log` di debug (tenuti quelli della firma in `navbar.jsx`)
- 2026-09-17 – Home: tolto il doppio `id="breakfast"`, ora un'unica ancora prima delle due sezioni (il link del menu su mobile puntava alla sezione desktop nascosta)
- 2026-09-17 – `roomlayout.jsx`: `PillInfo`/`ServiceDotList` trasformati in funzioni di render (non più ricreati a ogni render), 0 errori eslint nel file
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
