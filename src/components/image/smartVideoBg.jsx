import { cn } from "@/lib/utility"

export default function SmartVideoBg({ src, overlayColor, className }) {

    // Calcoliamo le versioni ottimizzate al volo
    const optimizedSrc = (url) => {
        if (!url || !url.includes("cloudinary")) return url
        // Aggiunge parametri auto-format e qualità
        return url.replace("/upload/", "/upload/f_auto,q_auto,w_1080,vc_auto/")
    }

    const posterSrc = (url) => {
        if (!url) return ""
        if (url.includes("cloudinary")) {
            // Cambia estensione in jpg e ottimizza
            return url.replace(/\.[^/.]+$/, ".jpg").replace("/upload/", "/upload/f_auto,q_auto,w_1080/")
        }
        return "" // O un placeholder di default
    }

    return (
        <div className={cn("absolute inset-0 z-[-1] overflow-hidden", className)}>
            <video
                className="object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
                poster={posterSrc(src)}
            >
                <source src={optimizedSrc(src)} type="video/mp4" />
            </video>

            {/* L'overlay lo gestiamo qui dentro, così è tutto incapsulato */}
            <div className={cn("absolute inset-0 transition-colors duration-700", overlayColor)} />
        </div>
    )
}