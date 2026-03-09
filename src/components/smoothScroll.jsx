"use client"
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }) {

    // Opzioni di Lenis per personalizzare la "morbidezza"
    const lenisOptions = {
        lerp: 0.1,         // Inerzia (più basso = più scivoloso. 0.1 è standard)
        duration: 1.5,     // Durata dello scroll (più alto = più lento)
        smoothWheel: true, // Abilita smooth su rotella mouse
        wheelMultiplier: 1 // Moltiplicatore velocità (puoi aumentarlo a 1.2 o 1.5)
    }

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    )
}

export default SmoothScrolling