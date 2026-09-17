// app/hooks/sendEmail.js
'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

// Limiti dei campi (controllati anche lato server, il form lato client si può aggirare)
const MAX_LENGTH = { name: 100, email: 254, phone: 30, message: 5000 }

// Rende sicuro un testo prima di inserirlo nell'HTML dell'email (niente tag o link iniettati)
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

// Legge un campo del form come testo pulito
function field(formData, key) {
    const value = formData.get(key)
    return typeof value === "string" ? value.trim() : ""
}

export async function sendEmail(formData) {
    const name = field(formData, 'name')
    const email = field(formData, 'email')
    const phone = field(formData, 'phone')
    const message = field(formData, 'message')
    const token = field(formData, 'token')

    // --- VALIDAZIONE CAMPI ---
    if (!name || !email || !message) {
        return { success: false, error: "Missing required fields" }
    }
    if (name.length > MAX_LENGTH.name || email.length > MAX_LENGTH.email ||
        phone.length > MAX_LENGTH.phone || message.length > MAX_LENGTH.message) {
        return { success: false, error: "Field too long" }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: "Invalid email" }
    }

    // --- RECAPTCHA VERIFICATION ---
    if (!token) {
        return { success: false, error: "reCAPTCHA token missing" }
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (!secretKey) {
        // Senza chiave segreta non possiamo verificare: blocchiamo l'invio invece di procedere
        console.error("RECAPTCHA_SECRET_KEY non è impostata nelle variabili d'ambiente.")
        return { success: false, error: "Server configuration error" }
    }

    try {
        const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ secret: secretKey, response: token })
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

    try {
        // Resend non lancia eccezioni: in caso di rifiuto restituisce { error }
        const { data, error } = await resend.emails.send({
            // Resend accetta solo "Nome <indirizzo>" con dominio verificato (caperenzin.it è verificato su Resend,
            // stesso mittente usato da WordPress/WP Mail SMTP)
            from: 'Contatto dal sito Ca Perenzin <info@caperenzin.it>',
            to: 'info@caperenzin.it', // La tua email reale
            replyTo: email, // "Rispondi" nella mail va direttamente a chi ha scritto
            subject: `Nuovo contatto da ${name.replace(/[\r\n]+/g, " ")}`,
            html: `
                <h2>Nuovo Messaggio dal Sito</h2>
                <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>N.cell:</strong> ${phone ? escapeHtml(phone) : 'Non specificato'}</p>
                <hr />
                <p><strong>Messaggio:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
            `
        });

        if (error) {
            console.error("Resend ha rifiutato l'email:", error)
            return { success: false, error: error.message }
        }

        return { success: true, data };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}
