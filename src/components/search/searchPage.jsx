
import Link from "next/link"
import BookingBar from "@/components/ui/booking/bookingBar"
import RoomCard from "@/components/ui/booking/roomCard"
import BtnBase from "../ui/btnBase";

export default function SearchPage({ dictionary, lang, checkIn, checkOut, guests, availableRooms }) {

    const hasRooms = availableRooms && availableRooms.length > 0;

    return (
        <div className="flex flex-col relative gap-7 w-full h-svh lg:h-dvh p-4 pt-7 md:pt-14 md:px-30 lg:px-20 xl:px-40 2xl:px-60 mt-20">
            <div
                className="flex w-full h-40 fixed top-0 left-0 z-40"
                style={{ background: 'linear-gradient(to bottom, var(--background) 30%, transparent 100%)' }} />


            <BookingBar
                dictionary={dictionary}
                lang={lang}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
            />

            {/* ROOM CARD */}
            <div className={`
                            ${hasRooms ? "grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 pb-40" : "flex w-full h-full justify-center items-center"}
                `}>
                {hasRooms ? availableRooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                        dictionary={dictionary}
                        lang={lang}
                    />

                )) : (
                    <div className="flex flex-col w-full justify-center items-center text-center mt-[-100px]">
                        <p className="text-sm md:text-lg xl:text-xl text-white/80 font-light mx-auto text-balance   leading-relaxed">
                            {lang === 'it'
                                ? "Le nostre suite sono al completo per le date selezionate. La invitiamo a contattarci direttamente per trovare insieme la soluzione ideale per il suo soggiorno."
                                : "Our suites are fully booked for the selected dates. We invite you to contact us directly to find the ideal solution for your stay."}
                        </p>
                        <BtnBase
                            className="mt-10 bg-gold transition-all duration-300 hover:scale-105"
                            textClassName={`group-hover:text-foreground `}
                            href={`/${lang}/contact`}
                        >
                            {dictionary.menu.contact}
                        </BtnBase>

                    </div>
                )}

            </div>


        </div>
    )
}
