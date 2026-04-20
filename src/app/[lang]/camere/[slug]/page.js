
import { getDictionary } from "@/lib/dictionary"
import { notFound } from "next/navigation"
import RoomLayout from "@/components/room/roomlayout"
import StructuredData from "@/components/seo/StructuredData"
import { getRoomSchema } from "@/components/seo/jsonLd"



export async function generateMetadata({ params }) {
    const { lang, slug } = await params
    const dictionary = await getDictionary(lang)
    const dataRoom = dictionary.dataRooms.find(r => r.slug === slug)

    if (!dataRoom) {
        return {
            title: "Camera non trovata",
        }
    }

    const baseDesc = dataRoom.description ? dataRoom.description.substring(0, 110) + "..." : `Scopri la camera ${dataRoom.roomName} a Ca'Perenzin.`;
    const description = lang === 'it' 
        ? `${baseDesc} Prenota la tua stanza nel nostro B&B di lusso tra Tarzo e Conegliano. Un alloggio esclusivo per relax e calma.`
        : `${baseDesc} Book your room in our luxury B&B near Tarzo and Conegliano. An exclusive accommodation for relax and calmness.`;

    return {
        title: dataRoom.roomName,
        description: description,
        alternates: {
            canonical: `/${lang}/camere/${slug}`,
            languages: {
                'it': `/it/camere/${slug}`,
                'en': `/en/camere/${slug}`,
            },
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
        <>
            <StructuredData data={getRoomSchema(dataRoom, lang)} />
            <RoomLayout dictionary={dictionary} dataRoom={dataRoom} lang={lang} />
        </>
    )
}