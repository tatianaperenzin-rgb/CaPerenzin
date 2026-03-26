"use client"

import { getImageProps } from "next/image"

export default function SmartBackground({ srcMobile, srcDesktop, alt = "Sfondo", className = "", priority = false }) {

    // Ottimizzazioni per alleggerire le immagini
    const common = { 
        alt, 
        fill: true, 
        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw",
        quality: 65 
    }

    // Fallback: se manca il mobile, usiamo il desktop
    const mobileValues = srcMobile || srcDesktop

    // Prepara l'immagine per il MOBILE
    const {
        props: { srcSet: mobileSrcSet, fetchPriority: mobileFetchPriority, ...rest }
    } = getImageProps({
        ...common,
        src: mobileValues,
        priority
    })

    // Prepara l'immagine per il DESKTOP
    const {
        props: { srcSet: desktopSrcSet }
    } = getImageProps({
        ...common,
        src: srcDesktop,
        priority
    })

    return (
        <div className={`absolute top-0 left-0 z-0 h-full w-full overflow-hidden ${className}`}>
            <picture>
                <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
                <img
                    {...rest}
                    fetchPriority={priority ? "high" : "auto"}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </picture>

            {/* Un leggero overlay nero per rendere leggibile il testo bianco sopra */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}
        </div>
    )
}