
import "server-only"

const dictionaries = {
    it: () => import(`@/dictionaries/it.json`).then((module) => module.default),
    en: () => import(`@/dictionaries/en.json`).then((module) => module.default)
}

export const getDictionary = async (locale) => {
    if (!locale || !dictionaries[locale]) {
        console.warn(`Lingua '${locale}' non trovata. Uso fallback 'it'.`)
        return dictionaries['it']()
    }
    return dictionaries[locale]()
}
