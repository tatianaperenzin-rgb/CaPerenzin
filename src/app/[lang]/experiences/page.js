
import { getDictionary } from "@/lib/dictionary"
import Experience from "@/components/experience/experience"



export async function generateMetadata({ params }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    return {
        title: dictionary.menu.experience,
        description: dictionary.hero.heroIntroOne,
        alternates: {
            canonical: `/${lang}/experiences`,
        }
    }
}

export default async function Experiences({ params }) {

    const { lang } = await params
    const dictionary = await getDictionary(lang)
    const exp = dictionary.experiences

    return (
        <Experience dictionary={dictionary} exp={exp} lang={lang} />
    )
}