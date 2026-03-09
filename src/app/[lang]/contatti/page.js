
import { getDictionary } from "@/lib/dictionary"
import ContactPage from "@/components/contacts/contactPage"



export async function generateMetadata({ params }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return {
        title: dictionary.menu.contact,
        description: dictionary.hero.heroIntroOne,
        alternates: {
            canonical: `/${lang}/contatti`,
        }
    }
}

export default async function Contatti({ params }) {

    const { lang } = await params
    const dictionaryFull = await getDictionary(lang)
    const dictionary = dictionaryFull.contacts

    const sectionODict = {
        ...dictionaryFull.sectionO,
        assetUi: dictionaryFull.assetUi
    }

    return (
        <ContactPage dictionary={dictionary} lang={lang} dictionarySectionO={sectionODict} bookingDictionary={dictionaryFull} dictionaryForm={dictionaryFull.form} />
    )
}