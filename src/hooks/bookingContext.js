"use client"

import { createContext, useContext, useState, useEffect } from "react"

const BookingContext = createContext()

export function BookingProvider({ children }) {
    const [date, setDate] = useState({ from: null, to: null })
    const [guests, setGuests] = useState(2)

    // Load from sessionStorage on mount
    useEffect(() => {
        const savedData = sessionStorage.getItem("booking_params")
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                if (parsed.checkIn || parsed.checkOut) {
                    setDate({
                        from: parsed.checkIn ? new Date(parsed.checkIn) : null,
                        to: parsed.checkOut ? new Date(parsed.checkOut) : null
                    })
                }
                if (parsed.guests) {
                    setGuests(parsed.guests)
                }
            } catch (e) {
                console.error("Failed to parse booking_params", e)
            }
        }
    }, [])

    // Save to sessionStorage whenever state changes
    useEffect(() => {
        const dateBooking = {
            checkIn: date?.from,
            checkOut: date?.to,
            guests: guests
        }
        // Only save if there is some data to save
        if (date?.from || guests !== 2) {
            sessionStorage.setItem("booking_params", JSON.stringify(dateBooking))
            console.log("Context: date_saved_in_session", dateBooking)
        }
    }, [date, guests])

    return (
        <BookingContext.Provider value={{ date, setDate, guests, setGuests }}>
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}
