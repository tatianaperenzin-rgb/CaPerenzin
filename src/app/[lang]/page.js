
import { getDictionary } from "@/lib/dictionary"
import Intro from "@/components/home/intro"
import SectionA from "@/components/home/sectionA"
import SectionB from "@/components/home/sectionB"
import SectionC from "@/components/home/sectionC"
import SectionD from "@/components/home/sectionD"
import Test from "@/components/empty/test"
import BubbleTest from "@/components/empty/bubbleTest"
import TestD from "@/components/empty/testD"
import SectionEF from "@/components/empty/SectionEF"
import SectionG from "@/components/home/sectionG"
import HorizontalScroll from "@/components/ui/horizontalScroll"
import SectionH from "@/components/home/sectionH"
import SectionIL from "@/components/empty/SectionIL"
import SectionM from "@/components/home/sectionM"
import SectionN from "@/components/home/sectionN"
import SectionO from "@/components/home/sectionO"
import SectionNO from "@/components/empty/sectionNO"


import SplashScreen from "@/components/ui/splashScreen"


export async function generateMetadata({ params }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return {
    title: dictionary.hero.heroOpen.headline,
    description: dictionary.hero.heroIntroTwo,
    alternates: {
      canonical: `/${lang}`,
    }
  }
}


export default async function Home({ params }) {

  //params mi da l'url con la lingua

  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (

    <>
      <SplashScreen dictionary={dictionary} />
      <Intro dictionary={dictionary} lang={lang} />
      <SectionA dictionary={dictionary} lang={lang} />
      <SectionB dictionary={dictionary} lang={lang} />

      {/* >ROOM CAROUSEL + SECTION-D THROUGT */}
      <section id="room">
        <BubbleTest dictionary={dictionary} lang={lang} />
      </section>

      <SectionEF dictionary={dictionary} lang={lang} />

      <section id="breakfast">
        <HorizontalScroll>
          <SectionG dictionary={dictionary.sectionG} lang={lang} />
          <SectionH dictionary={dictionary.sectionH} lang={lang} />
        </HorizontalScroll>
      </section>

      <SectionIL dictionary={dictionary} lang={lang} />
      <SectionM dictionary={dictionary.sectionM} lang={lang} />


      <SectionNO dictionary={dictionary} bookingDictionary={dictionary} lang={lang} />






    </>
  )
}
