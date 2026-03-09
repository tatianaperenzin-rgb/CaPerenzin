"use server" // <--- IMPORTANTE: Questo dice a Next.js che codice server

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/form/emailTemplate';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(formData) {
    const username = formData.username;
    const email = formData.email;
    const message = formData.message;
    const phone = formData.phone;

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', // Usa questo finché non configuri il tuo dominio su Resend
            to: 'tatiana.perenzin@gmail.com', // <--- METTI LA TUA EMAIL REALE QUI DOVE VUOI RICEVERLE
            subject: `Nuovo messaggio da ${username}`,
            react: EmailTemplate({ username, phone, email, message }),
        });

        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    }
}