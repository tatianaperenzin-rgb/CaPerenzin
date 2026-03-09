"use client"

import { useEffect } from "react"
import BookingNav from "./bookingNav"
import { useBooking } from "@/hooks/bookingContext"

export default function BookingBar({ dictionary, lang, checkIn, checkOut, guests: initialGuests }) {
    const { setDate, setGuests } = useBooking()

    // Sync URL search params into booking context on mount
    useEffect(() => {
        if (checkIn && checkOut) {
            setDate({
                from: new Date(checkIn),
                to: new Date(checkOut)
            })
        }
        if (initialGuests) {
            setGuests(Number(initialGuests))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="flex w-full fixed bottom-0 right-0 items-center justify-center pt-20 pb-7 z-99"
            style={{
                background: 'linear-gradient(to top, var(--background) 30%, transparent 100%)'
            }}
        >
            <BookingNav
                dictionary={dictionary}
                lang={lang}
                alwaysOpen={true}
                bookNavOpen={true}
                setBookNavOpen={() => { }}
                expandBookNav={() => { }}
                buttonLabel={dictionary.cerca || "Cerca"}
            />
        </div>
    )
}
