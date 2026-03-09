
// app/hooks/sendEmail.js
'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')
    const token = formData.get('token')

    // --- RECAPTCHA VERIFICATION ---
    if (!token) {
        return { success: false, error: "reCAPTCHA token missing" }
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
        console.error("RECAPTCHA_SECRET_KEY non è impostata nelle variabili d'ambiente.")
        // In sviluppo potresti voler passare comunque, in produzione NO.
        // return { success: false, error: "Server Configuration Error" }
    }

    try {
        const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${token}`
        })
        const recaptchaData = await recaptchaRes.json()

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            console.error("reCAPTCHA fallito:", recaptchaData)
            return { success: false, error: "Bot detected by reCAPTCHA" }
        }
    } catch (e) {
        console.error("Errore verifica reCAPTCHA:", e)
        return { success: false, error: "reCAPTCHA verification failed" }
    }


    console.log("Tentativo di invio...")
    console.log("Da (Utente):", email)

    try {
        const data = await resend.emails.send({
            from: '🔴 CONTATTO DA SITO - Ca Perenzin',
            to: 'info@caperenzin.it', // La tua email reale
            reply_to: email,
            subject: `Nuovo contatto da ${name}`,
            html: `
                <h2>Nuovo Messaggio dal Sito</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>N.cell:</strong> ${phone || 'Non specificato'}</p>
                <hr />
                <p><strong>Messaggio:</strong></p>
                <p>${message}</p>
            `
        });

        return { success: true, data };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}