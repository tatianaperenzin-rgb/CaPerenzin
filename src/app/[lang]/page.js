
import { getDictionary } from "@/lib/dictionary"
import Intro from "@/components/home/intro"
import dynamic from 'next/dynamic'
import SplashScreen from "@/components/ui/splashScreen"

// Sections below the fold loaded dynamically
const SectionA = dynamic(() => import('@/components/home/sectionA'))
const SectionB = dynamic(() => import('@/components/home/sectionB'))
const BubbleTest = dynamic(() => import('@/components/empty/bubbleTest'))
const SectionEF = dynamic(() => import('@/components/empty/SectionEF'))
const SectionG = dynamic(() => import('@/components/home/sectionG'))
const HorizontalScroll = dynamic(() => import('@/components/ui/horizontalScroll'))
const SectionH = dynamic(() => import('@/components/home/sectionH'))
const SectionIL = dynamic(() => import('@/components/empty/SectionIL'))
const SectionM = dynamic(() => import('@/components/home/sectionM'))
const SectionNO = dynamic(() => import('@/components/empty/sectionNO'))


export async function generateMetadata({ params }) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return {
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
