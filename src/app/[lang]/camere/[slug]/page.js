
import { getDictionary } from "@/lib/dictionary"
import { notFound } from "next/navigation"
import RoomLayout from "@/components/room/roomlayout"



export async function generateMetadata({ params }) {
    const { lang, slug } = await params
    const dictionary = await getDictionary(lang)
    const dataRoom = dictionary.dataRooms.find(r => r.slug === slug)

    if (!dataRoom) {
        return {
            title: "Camera non trovata",
        }
    }

    // Use a fallback description if dataRoom.description is not available or too short
    const description = dataRoom.description || `Scopri la camera ${dataRoom.roomName} a Ca'Perenzin. Un soggiorno di lusso immerso nella natura.`

    return {
        title: dataRoom.roomName,
        description: description,
        alternates: {
            canonical: `/${lang}/camere/${slug}`,
        },
        openGraph: {
            title: dataRoom.roomName,
            description: description,
            images: dataRoom.gallery && dataRoom.gallery[0] ? [{ url: dataRoom.gallery[0].bkDesk }] : [],
        }
    }
}

export default async function Camere({ params }) {

    const { lang } = await params
    const { slug } = await params

    //console.log("slug", slug)

    const dictionary = await getDictionary(lang)

    const dataRoom = dictionary.dataRooms.find(r => r.slug === slug)
    //console.log("dataroom", dataRoom)

    if (!dataRoom) {
        notFound()
    }

    return (
        <RoomLayout dictionary={dictionary} dataRoom={dataRoom} lang={lang} />
    )
}