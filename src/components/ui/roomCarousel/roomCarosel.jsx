"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"

import BubbleFrame from "@/components/ui/bubbleFrame"
import ControlsHome from "@/components/ui/roomCarousel/controlsHome"
import SmartBackground from "@/components/image/smartBackround"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import BookingNav from "@/components/ui/booking/bookingNav"


export default function RoomCarosel({ dictionary, lang }) {

    // Componente interno per gestire lo stato di apertura/chiusura del BookingNav in ogni slide.
    // Serve perché il BookingNav originale richiede lo stato passato dal genitore.
    function BookingNavWithState(props) {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <BookingNav
                {...props}
                bookNavOpen={isOpen}
                setBookNavOpen={setIsOpen}
                expandBookNav={() => setIsOpen(true)}
                alwaysOpen={false}
            />
        )
    }

    // Assicurati che images sia sempre un array per evitare crash
    const rooms = dictionary?.dataRooms
    const ui = dictionary?.assetUi

    // Togli 'duration: 40' che causava lo scatto immediato (40ms). 
    // Embla usa la fisica di default che è molto fluida.
    //const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 40,
        breakpoints: {
            '(min-width: 1024px)': { axis: 'y' }
        }
    })

    const [roomIndex, setRoomIndex] = useState(0)

    // Log for debugging
    //console.log("DATA ROOMS:", rooms)

    /* GESTIONE IMMAGINE CORRENTE */
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setRoomIndex(emblaApi.selectedScrollSnap())

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

        <BubbleFrame className="h-full" color="bg-transparent">
            <ControlsHome
                dictionary={dictionary}
                lang={lang}
                totalRoom={rooms.length}
                onSelect={roomIndex}
                onNext={scrollNext}
                onBack={scrollPrev}
                onScrollTo={scrollTo}
            />

            <div className="overflow-hidden h-full w-full" ref={emblaRef}>
                <div className="flex flex-row lg:flex-col h-full touch-pan-y lg:touch-pan-x">
                    {rooms.map((room, index) => (
                        <div key={index} className="relative flex-[0_0_100%] h-full w-full">
                            {room.gallery && room.gallery[0] && (
                                <div className={`flex w-full h-full p-10 md:p-20 lg:p-0 
                                                items-end lg:items-center
                                                pb-40 xs:pb-50 md:pb-70 lg:pb-0 lg:ps-60 xl:ps-70 
                                                relative transition-all duration-700 ease-in-out
                                                ${index === roomIndex ? "opacity-100 blur-0 scale-100" : "opacity-30 blur-sm scale-95"}
                                                `}>
                                    <SmartBackground
                                        // Use optional chaining and handle the space in key if needed
                                        // Assuming " bkMobile" in JSON might be a typo, trying both
                                        srcMobile={room.gallery[0].bkMobile || room.gallery[0].bkDesk}
                                        srcDesktop={room.gallery[0].bkDesk}
                                        alt={room.roomName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="flex w-full h-full bg-black/60 absolute z-10 top-0 left-0 inset-0" />

                                    <div className={`flex flex-col z-99 gap-1 lg:mt-20 
                                                    transition-all duration-700 delay-200 
                                                    ${index === roomIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                                                    `}>
                                        <p className="font-muller text-sx md:text-xl">{room.roomSubName}</p>
                                        <h1 className="font-black text-3xl xs:text-4xl md:text-6xl 2xl:text-7xl">{room.roomName}</h1>
                                        <p className="font-muller leading-tight text-sm xs:text-base text-balance mt-5 lg:w-2/3">{room.carousellContent}</p>
                                        <div className="flex flex-col gap-4 mt-5">
                                            <Link href={`/${lang}/camere/${room.slug}`} className="cursor-pointer text-sm flex jusify-center items-center gap-2 hover:text-gold hover:text-shadow-xl w-fit">
                                                <HiOutlineArrowNarrowRight size={20} className="pt-0.5" />
                                                {ui.viewDitails}
                                            </Link>
                                            <div className="w-fit mt-2">
                                                {/* Qui usiamo BookingNavWithState per avere un calendario indipendente per ogni slide */}
                                                <BookingNavWithState
                                                    dictionary={dictionary}
                                                    lang={lang}
                                                    room={room} // Passiamo i dati della stanza corrente per filtrare il calendario
                                                    btnClassName="bg-gold text-foreground hover:bg-background hover:border-gold hover:border-1"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            )}
                        </div>
                    ))}
                </div>
            </div>

        </BubbleFrame>

    )
}