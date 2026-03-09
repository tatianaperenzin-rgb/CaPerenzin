"use client"

import { useState, useEffect } from "react"
import BtnBase from "@/components/ui/btnBase"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

export default function RoomCard({ room, dictionary, lang }) {
    const [dynamicPrice, setDynamicPrice] = useState(room.price)

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await fetch(`/api/room-price?id=${room.wpTypeId}`)
                const data = await res.json()
                if (data.price) {
                    setDynamicPrice(data.price)
                }
            } catch (error) {
                console.error("[RoomCard] Errore fetch prezzo:", error)
            }
        }
        fetchPrice()
    }, [room.wpTypeId])

    return (
        <div className="flex flex-col gap-4 border border-white/10 p-3 rounded-4xl bg-white/3 hover:border-gold transition-all duration-500">

            {/* Image */}
            <div className="aspect-video w-full overflow-hidden rounded-2xl relative">
                {room.gallery?.[0]?.bkDesk && (
                    <img
                        src={room.gallery[0].bkDesk}
                        alt={room.roomName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 shadow-2xl"
                    />
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-4 py-2 xs:py-3 rounded-full text-foreground text-xs shadow-xl">
                    € {dynamicPrice} / {dictionary.assetUi.night}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-3">

                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-white/60 font-muller">{room.roomSubName}</p>
                        <h2 className="text-2xl md:text-3xl font-black">{room.roomName}</h2>

                    </div>
                </div>

                <p className="text-foreground text-xs xs:text-sm line-clamp-2 font-muller my-2">
                    {room.description}
                </p>

                {/* Actions */}
                <div className="flex gap-4 mt-2 items-center">

                    <BtnBase
                        iconEnd={HiOutlineArrowNarrowRight}
                        className={`bg-gold shadow-xl`}
                        textClassName={`text-xs lg:text-[12px] group-hover:text-foreground transition-all duration-300`}
                        href={`/${lang}/camere/${room.slug}`}

                    >
                        {dictionary.assetUi.entryRoom}
                    </BtnBase>
                </div>
            </div>
        </div>
    )
}
