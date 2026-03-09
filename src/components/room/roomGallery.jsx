"use client"

import React, { useState, useEffect, useCallback } from "react"

import useEmblaCarousel from "embla-carousel-react"

import BubbleFrame from "@/components/ui/bubbleFrame"
import ControllerGallery from "@/components/room/controllerGallery"
import SmartBackground from "@/components/image/smartBackround"
import BtnBase from "../ui/btnBase"
import { LuLogOut } from "react-icons/lu"
import { IoCloseCircle } from "react-icons/io5"


export default function RoomGallery({ dictionary, lang, dataRoom, setIsGallery }) {

    const gallery = dataRoom.gallery
    const ui = dictionary?.assetUi

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 25 // Un po' di frizione per renderlo naturale
    })

    const [galleryIndex, setGalleryIndex] = useState(0)


    /* GESTIONE IMMAGINE CORRENTE */
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setGalleryIndex(emblaApi.selectedScrollSnap())

    }, [emblaApi])

    /* GESTIONE CONTATORE */
    useEffect(() => {
        if (!emblaApi) return
        onSelect() // Init
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
    }, [emblaApi, onSelect])

    // FUNZIONI DI CONTROLLO (Da passare al figlio)
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    // Per un salto fluido ai pallini, usiamo scrollTo con animazione default
    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi])



    return (

        <div className="h-full w-full relative bg-gold">
            <ControllerGallery
                dictionary={dictionary}
                lang={lang}
                totalRoom={gallery.length}
                onSelect={galleryIndex}
                onNext={scrollNext}
                onBack={scrollPrev}
                onScrollTo={scrollTo}
                controlClass={`z-999`}

            />

            <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {gallery.map((img, index) => (
                        <div key={index} className="relative flex-[0_0_100%] h-full w-full">
                            <div className="flex h-full w-full items-center">
                                <SmartBackground
                                    srcMobile={img.bkMobile || img.bkDesk}
                                    srcDesktop={img.bkDesk}
                                    alt={dataRoom.roomName || "Gallery Image"}
                                    className="w-full h-full object-cover"
                                />

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* EXIT BTN GALLRY ROOM MOBILE */}
            <BtnBase
                onClick={(e) => {
                    e.stopPropagation();
                    setIsGallery(false);
                }}
                textClassName="text-gold"
                iconStart={LuLogOut}
                iconClassName="text-gold rotate-180 size-4"
                className="absolute top-5 left-3 bg-background shrink-0 h-10 xs:h-11 z-999 cursor-pointer
                                    px-4 py-0 xs:px-5 xs:py-3 shadow-lg hover:shadow-xl transition-shadow border border-gold/20 lg:hidden"
            >
                {dictionary.assetUi.exit}
            </BtnBase>

        </div>

    )
}