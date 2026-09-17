
import "server-only"

const dictionaries = {
    it: () => import(`@/dictionaries/it.json`).then((module) => module.default),
    en: () => import(`@/dictionaries/en.json`).then((module) => module.default)
}

// Sezioni pesanti usate solo dalla propria pagina (termini, privacy, cookie, esperienze)
const PAGE_ONLY_SECTIONS = ["terms", "privacy", "cookie", "experiences"]

// Dizionario da passare ai componenti client: stessa struttura, ma senza le sezioni pesanti
// che la pagina non usa. Tutto ciò che arriva a un componente client viene scritto nell'HTML.
// keep: sezioni da mantenere (es. ["experiences"] nella pagina esperienze)
export const clientDictionary = (dictionary, keep = []) => {
    const result = { ...dictionary }
    for (const key of PAGE_ONLY_SECTIONS) {
        if (!keep.includes(key)) delete result[key]
    }
    return result
}

export const getDictionary = async (locale) => {
    if (!locale || !dictionaries[locale]) {
        console.warn(`Lingua '${locale}' non trovata. Uso fallback 'it'.`)
        return dictionaries['it']()
    }
    return dictionaries[locale]()
}
