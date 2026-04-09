
import { getDictionary } from "@/lib/dictionary"
import Experience from "@/components/experience/experience"
import StructuredData from "@/components/seo/StructuredData"
import { getExperienceSchema } from "@/lib/jsonLd"



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
        <>
            <StructuredData data={getExperienceSchema(exp, lang)} />
            <Experience dictionary={dictionary} exp={exp} lang={lang} />
        </>
    )
}