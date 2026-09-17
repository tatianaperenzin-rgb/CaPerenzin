// Loader per next/image: l'immagine viene ridimensionata e compressa direttamente da Cloudinary
// (niente doppio passaggio dall'ottimizzatore di Next/Netlify)
// f_auto = formato migliore per il browser (AVIF/WebP) · q = qualità · w = larghezza richiesta da Next · c_limit = mai ingrandire
export default function cloudinaryLoader({ src, width, quality }) {
    if (!src?.includes("res.cloudinary.com") || !src.includes("/upload/")) return src

    const transformations = ["f_auto", `q_${quality || "auto"}`, `w_${width}`, "c_limit"].join(",")
    return src.replace("/upload/", `/upload/${transformations}/`)
}
