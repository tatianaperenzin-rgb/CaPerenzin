

import { getDictionary } from "@/lib/dictionary"
import { checkAvailability } from "@/lib/availability"
import SearchPage from "@/components/search/searchPage"



export async function generateMetadata({ params }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)
    return {
        title: dictionary.prenota + " | Ca'Perenzin",
        description: dictionary.hero.heroIntroOne,
        alternates: {
            canonical: `/${lang}/booking`,
        }
    }
}

export default async function BookingPage({ params, searchParams }) {
    const { lang } = await params
    const dictionary = await getDictionary(lang)

    const sp = await searchParams
    const checkIn = sp.checkIn
    const checkOut = sp.checkOut
    const guests = sp.guests

    const rooms = dictionary.dataRooms
    const availableRooms = await checkAvailability(rooms, checkIn, checkOut)



    return (
        <SearchPage dictionary={dictionary} lang={lang} checkIn={checkIn} checkOut={checkOut} guests={guests} availableRooms={availableRooms} />
    )
}
