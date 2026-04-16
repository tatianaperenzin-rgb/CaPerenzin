
import { getDictionary } from "@/lib/dictionary"
import Experience from "@/components/experience/experience"
import StructuredData from "@/components/seo/StructuredData"
import { getExperienceSchema } from "@/components/seo/jsonLd"



export async function generateMetadata({ params }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    const isIt = lang === 'it';
    const seoTitle = isIt 
        ? `${dictionary.menu.experience} | Relax e Natura al B&B Tra Conegliano e Tarzo` 
        : `${dictionary.menu.experience} | Nature and Relax near Conegliano and Tarzo`;
    const seoDesc = isIt 
        ? "Esplora le Colline del Prosecco dal nostro alloggio di lusso. Vivi esperienze esclusive all'insegna del relax e del comfort, partendo dal nostro B&B a due passi da Conegliano e Tarzo."
        : "Explore the Prosecco Hills from our luxury accommodation. Live exclusive experiences of relax and comfort, starting from our B&B near Conegliano and Tarzo.";

    return {
        title: seoTitle,
        description: seoDesc,
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