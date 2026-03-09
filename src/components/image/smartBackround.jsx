"use client"

import { getImageProps } from "next/image"

export default function SmartBackground({ srcMobile, srcDesktop, alt = "Sfondo", className = "" }) {

    const common = { alt, fill: true, sizes: "100vw" }

    // Fallback: se manca il mobile, usiamo il desktop
    const mobileValues = srcMobile || srcDesktop

    // Prepara l'immagine per il MOBILE
    const {
        props: { srcSet: mobileSrcSet, ...rest }
    } = getImageProps({
        ...common,
        src: mobileValues,
        priority: true // Importante per l'immagine Hero
    })

    // Prepara l'immagine per il DESKTOP
    const {
        props: { srcSet: desktopSrcSet }
    } = getImageProps({
        ...common,
        src: srcDesktop,
        priority: true // Importante per l'immagine Hero
    })

    return (
        <div className={`absolute top-0 left-0 z-0 h-full w-full overflow-hidden ${className}`}>
            <picture>
                <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
                <img
                    {...rest}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </picture>

            {/* Un leggero overlay nero per rendere leggibile il testo bianco sopra */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}
        </div>
    )
}