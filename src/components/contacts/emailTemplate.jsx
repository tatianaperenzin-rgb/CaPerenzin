import * as React from 'react';

export const EmailTemplate = ({ username, phone, email, message }) => (
    <div>
        <h1>Hai una nuova richiesta dal sito!</h1>
        <p><strong>Da:</strong> {username}</p>
        <p><strong>Cell:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        <hr />
        <p><strong>Messaggio:</strong></p>
        <p>{message}</p>
    </div>
);