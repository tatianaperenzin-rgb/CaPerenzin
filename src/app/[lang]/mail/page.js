import React from 'react';


export function generateMetadata() {
    return {
        title: "Email Preview | Ca'Perenzin",
        robots: {
            index: false,
            follow: false,
        }
    }
}

export default function MailPreview() {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conferma Prenotazione Ca' Perenzin</title>
    <style type="text/css">
        /* --- CARICAMENTO FONT PER EMAIL --- */
        @font-face {
            font-family: 'PPMonumentExtended';
            src: url('https://caperenzin.it/wp-content/fonts/PPMonumentExtended-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }

        @font-face {
            font-family: 'PPMonumentExtended';
            src: url('https://caperenzin.it/wp-content/fonts/PPMonumentExtended-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: bold;
        }

        @font-face {
            font-family: 'MullerNext';
            src: url('https://caperenzin.it/wp-content/fonts/MullerNextTrial-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }

        /* --- STILI GLOBALI (Reset e Base) --- */
        body {
            margin: 0;
            padding: 0;
            background-color: #0c0c0c;
            font-family: 'MullerNext', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #cccccc;
            -webkit-text-size-adjust: none;
        }

        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        a {
            color: #B08D55;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* --- CLASSI DI UTILITÀ PER I FONT --- */
        .monument {
            font-family: 'PPMonumentExtended', 'Arial Black', sans-serif !important;
            
        }

        .muller {
            font-family: 'MullerNext', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }

        /* --- RESPONSIVE --- */
        @media only screen and (max-width: 600px) {
            .wrapper-table {
                width: 100% !important;
                padding: 0 !important;
            }

            .content-table {
                width: 100% !important;
                border: 0 !important;
            }

            .padding-mobile {
                padding: 20px !important;
            }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #0c0c0c;">

    <!-- Testo nascosto di anteprima (Preheader) -->
    <div style="display: none; font-size: 1px; color: #0c0c0c; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Siamo lieti di confermare il tuo soggiorno esclusivo presso Ca' Perenzin.
    </div>

    <!-- Wrapper Principale -->
    <table class="wrapper-table" style="background-color: #0c0c0c;" border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td style="padding: 20px 0;" align="center">

                    <!-- Contenitore Centrale (Email Card) -->
                    <table class="content-table" style="background-color: #141414; border-top: 4px solid #B08D55; border-bottom: 1px solid #333; max-width: 600px; margin: 0 auto;" border="0" width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            
                            <!-- Header: Logo Testuale -->
                            <tr>
                                <td class="padding-mobile" style="padding: 30px 20px 00px 20px; " align="center">
                                    <h1 class="monument" style="color: #B08D55; font-size: 32px; margin: 0; font-weight: 800; font-style:black;  font-family: 'PPMonumentExtended'">
                                        Ca'Perenzin
                                    </h1>
                                </td>
                            </tr>

                            <!-- Messaggio di Benvenuto -->
                            <tr>
                                <td class="padding-mobile" style="padding: 50px 40px 20px 40px;" align="center">
                                    <h2 class="muller" style="color: ##E8E6D9; font-size: 18px; margin: 0 0 20px 0; font-weight: 400; font-family: 'PPMonumentExtended'">
                                        "Il lusso del tempo, lo spazio dell'anima."
                                    </h2>
                                    <p class="muller" style="color: #aaaaaa; font-size: 16px; line-height: 1.6; margin: 0; font-family: 'MullerNext', sans-serif;">
                                        Gentile <strong>Ospite</strong>,<br>
                                        Siamo lieti di confermare la tua prenotazione.
                                    </p>
                                </td>
                            </tr>

                            <!-- Dettagli Prenotazione -->
                            <tr>
                                <td class="padding-mobile" style="padding: 40px 5%;">
                                    <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3 class="monument" style="color: #B08D55; font-size: 13px; letter-spacing: 2px; margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 10px; font-family: 'PPMonumentExtended', sans-serif;">
                                                        DETTAGLI PRENOTAZIONE
                                                    </h3>

                                                    <table style="color: #dddddd; font-size: 15px;" border="0" width="100%" cellspacing="0" cellpadding="12">
                                                        <tbody>
                                                            <tr style="background-color: #1a1a1a;">
                                                                <td style="color: #888888; border-bottom: 1px solid #222;" width="40%">Codice ID:</td>
                                                                <td style="border-bottom: 1px solid #222; font-weight: bold; color: #fff;">#12345</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="color: #888888; border-bottom: 1px solid #222;">Check-in:</td>
                                                                <td style="border-bottom: 1px solid #222; color: #fff;">
                                                                    10 Marzo 2026
                                                                    <span style="font-size: 12px; color: #666; display: block;">(dalle 14:00)</span>
                                                                </td>
                                                            </tr>
                                                            <tr style="background-color: #1a1a1a;">
                                                                <td style="color: #888888; border-bottom: 1px solid #222;">Check-out:</td>
                                                                <td style="border-bottom: 1px solid #222; color: #fff;">
                                                                    11 Marzo 2026 
                                                                    <span style="font-size: 12px; color: #666; display: block;">(alle 11:00)</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="monument" style="color: #B08D55; padding-top: 30px; font-size: 14px; font-family: 'PPMonumentExtended', sans-serif;">
                                                                    PREZZO TOTALE:
                                                                </td>
                                                                <td class="monument" style="padding-top: 30px; color: #B08D55; font-size: 24px; font-weight: 700; font-family: 'PPMonumentExtended', sans-serif;">
                                                                    € 350,00
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Le tue Stanze -->
                            <tr>
                                <td class="padding-mobile" style="padding: 0 5% 40px 5%;">
                                    <div style="background-color: #000000; padding: 30px; border: 1px solid #333;">
                                        <h3 class="monument" style="color: #ffffff; font-size: 15px; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; letter-spacing: 1px; font-family: 'PPMonumentExtended', sans-serif;">
                                            LE TUE STANZE
                                        </h3>
                                        <div style="color: #cccccc; font-size: 14px; line-height: 1.8; font-family: 'MullerNext', sans-serif;">
                                            <strong>Soul Room</strong><br>
                                            Per 2 Adulti<br>
                                            Colazione inclusa
                                            
                                            <div style="margin-top: 25px; border-top: 1px dashed #333; padding-top: 15px; font-size: 12px; color: #888;">
                                                Cancellazione gratuita fino a 7 giorni prima.
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <!-- Footer Dati & Assistenza -->
                            <tr>
                                <td style="background-color: #000000; padding: 40px 5%;">
                                    <table border="0" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="padding-mobile" style="padding-right: 20px; border-right: 1px solid #222;" valign="top" width="50%">
                                                    <h3 class="monument" style="color: #666; font-size: 10px; letter-spacing: 2px; margin-bottom: 15px; font-family: 'PPMonumentExtended', sans-serif;">
                                                        DATI OSPITE
                                                    </h3>
                                                    <p style="color: #999999; font-size: 14px; margin: 0; line-height: 1.6; font-family: 'MullerNext', sans-serif;">
                                                        <strong style="color: #ccc;">Mario Rossi</strong><br>
                                                        mario.rossi@email.com<br>
                                                        +39 333 1234567
                                                    </p>
                                                </td>
                                                <td class="padding-mobile" style="padding-left: 20px;" valign="top" width="50%">
                                                    <h3 class="monument" style="color: #666; font-size: 10px; letter-spacing: 2px; margin-bottom: 15px; font-family: 'PPMonumentExtended', sans-serif;">
                                                        ASSISTENZA
                                                    </h3>
                                                    <p style="color: #999999; font-size: 14px; margin: 0; line-height: 1.6; font-family: 'MullerNext', sans-serif;">
                                                        Hai domande?<br>
                                                        <a style="color: #B08D55; text-decoration: none;" href="mailto:info@caperenzin.it">info@caperenzin.it</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>

                    <!-- Footer Copyright -->
                    <table border="0" width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td style="padding: 30px 20px; color: #444444; font-size: 11px; letter-spacing: 1px; font-family: 'MullerNext', sans-serif;" align="center">
                                    &copy; 2026 CA' PERENZIN. TUTTI I DIRITTI RISERVATI.
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table>

</body>
</html>
    `;

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#000', padding: '20px' }}>
            <h1 style={{ color: '#fff', marginBottom: '10px' }}>Anteprima Email</h1>
            <iframe
                srcDoc={htmlContent}
                style={{ width: '100%', maxWidth: '800px', height: '1000px', border: '1px solid #333', background: '#0c0c0c' }}
                title="Email Preview"
            />
        </div>
    );
}
