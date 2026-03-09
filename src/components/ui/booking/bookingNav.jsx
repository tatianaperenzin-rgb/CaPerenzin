"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import BtnBase from "@/components/ui/btnBase"
import { GuestSelector } from "./guestSelector"
import { DateRangeSelector } from "./dateRangeSelector"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import FullScreenLoader from "@/components/ui/fullScreenLoader"

import { useBooking } from "@/hooks/bookingContext"
import { BsArrowUpRightCircle } from "react-icons/bs"
import { AiOutlineLine } from 'react-icons/ai'
import { cn } from "@/lib/utility"

export default function BookingNav({ dictionary, lang, bookNavOpen, setBookNavOpen, expandBookNav, btnClassName, navClass, classBtnBooktoNavBook, alwaysOpen, room, buttonLabel }) {

    const { date, setDate, guests, setGuests } = useBooking()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const handleBook = async () => {
        console.log("[BookingNav] Clicked Book. Date:", date, "Room:", room ? room.roomName : "Generic Search");
        const baseUrl = process.env.NEXT_PUBLIC_WP_URL || 'https://admin.caperenzin.it';

        if (!date?.from || !date?.to) {
            console.warn("[BookingNav] Dates missing!");
            // Se le date non sono selezionate, non facciamo nulla (o potremmo mostrare un avviso)
            return
        }

        // Set cookie to persist language preference across the booking session
        document.cookie = `customer_lang=${lang}; path=/; max-age=86400; SameSite=Lax`;

        // LOGICA DI REINDIRIZZAMENTO
        if (room && room.motopressId) {
            // CASO 1: Prenotazione Specifica Stanza -> Diretta al Checkout WordPress
            // Due step server-side: room page → risultati → form checkout
            setIsLoading(true)
            try {
                const checkInStr = format(date.from, "yyyy-MM-dd")
                const checkOutStr = format(date.to, "yyyy-MM-dd")

                // L'API fa 2 passaggi: fetch room page (nonce) → fetch risultati (form checkout)
                const bookingRes = await fetch(
                    `/api/wp-booking?wpTypeId=${room.wpTypeId}&checkIn=${checkInStr}&checkOut=${checkOutStr}&adults=${guests}&children=0&lang=${lang}`
                )
                const bookingData = await bookingRes.json()

                if (bookingData.step === 2 && bookingData.bookingForm) {
                    // Abbiamo il form di prenotazione! Submittiamo via POST
                    const { action, hiddenFields } = bookingData.bookingForm

                    const form = document.createElement('form')
                    form.method = 'POST'
                    form.action = action
                    form.target = '_blank'
                    form.style.display = 'none'

                    Object.entries(hiddenFields).forEach(([name, value]) => {
                        const input = document.createElement('input')
                        input.type = 'hidden'
                        input.name = name
                        // Decodifica entità HTML (&amp; -> &, &#038; -> &)
                        input.value = value.replace(/&#0?38;/g, '&').replace(/&amp;/g, '&')
                        form.appendChild(input)
                    })

                    // Aggiungi ospiti se non già presenti nei campi hidden
                    console.log("Lingua inviata a WordPress:", lang)
                    const addField = (name, value) => {
                        if (!hiddenFields[name]) {
                            const input = document.createElement('input')
                            input.type = 'hidden'
                            input.name = name
                            input.value = String(value)
                            form.appendChild(input)
                        }
                    }
                    addField('mphb_adults', guests)
                    addField('mphb_children', 0)
                    addField('mphb_rooms_details[0][adults]', guests)
                    addField('mphb_children', 0)
                    addField('mphb_rooms_details[0][adults]', guests)
                    addField('mphb_rooms_details[0][children]', 0)
                    // Passiamo la lingua a WordPress per la gestione delle email (richiede snippet PHP lato WP)
                    addField('customer_lang', lang)

                    document.body.appendChild(form)
                    form.submit()
                    document.body.removeChild(form)
                    // Il form si apre in _blank, togliamo il loader
                    setTimeout(() => setIsLoading(false), 1500)
                } else {
                    // Fallback: vai ai risultati di ricerca
                    console.warn("[BookingNav] Form checkout non trovato, fallback ricerca")
                    window.open(`${baseUrl}/ricerca/`, '_blank')
                    setIsLoading(false)
                }

            } catch (error) {
                console.error("[BookingNav] Errore:", error)
                window.open(`${baseUrl}/ricerca/`, '_blank')
                setIsLoading(false)
            }

        } else {
            // CASO 2: Ricerca Generica (BookingNav Home) -> Vai alla pagina interna /booking
            // Crea i parametri URL per la pagina di prenotazione
            const params = new URLSearchParams({
                checkIn: date.from.toISOString(),
                checkOut: date.to.toISOString(),
                guests: guests
            })

            // Reindirizza l'utente alla pagina dei risultati (Forziamo il reload per garantire il fetch server-side)
            setIsLoading(true)
            window.location.href = `/${lang}/booking?${params.toString()}`
        }

        // Chiude il menu di navigazione dopo la ricerca
        setBookNavOpen(false)
    }

    const wrapperRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (alwaysOpen) return
            if (!bookNavOpen || !wrapperRef.current) return
            const isInsideWidget = wrapperRef.current.contains(e.target)

            const isInsidePopover = e.target.closest('[data-radix-popper-content-wrapper]')

            if (!isInsideWidget && !isInsidePopover) {
                setBookNavOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [bookNavOpen, setBookNavOpen, alwaysOpen])

    /* 
        useEffect(() => {
            const dateBooking = {
                checkIn: date?.from,
                checkOut: date?.to,
                guests: guests
            }
            if (date?.from) {
                sessionStorage.setItem("booking_params", JSON.stringify(dateBooking))
                console.log("date_saved_in_session", dateBooking)
            }
        }, [date, guests])
     */
    if (!dictionary) return null

    const isOpen = alwaysOpen ? true : bookNavOpen

    return (
        <div ref={wrapperRef} className={cn(`flex flex-col gap-3`, navClass)}>


            {!isOpen ? (
                <div className="fade-in-out">
                    <BtnBase
                        className={cn("hover:bg-background transition-all duration-300", btnClassName)}
                        textClassName={`group-hover:text-gold transition-all duration-300`}
                        onClick={expandBookNav}
                        iconClassName={`group-hover:text-gold transition-all duration-300`}
                        iconEnd={!isOpen ? BsArrowUpRightCircle : null}>
                        {dictionary.prenota}
                    </BtnBase>
                </div>
            ) : (
                <div className={`flex bg-current rounded-full items-center gap-2 justify-center
                            w-auto 
                            px-6 py-0.5
                                    xs:py-2 xs:px-8
                    
                                    md:px-1.5 md:py-1
                            
                            transition duration-300 delay-100  ease-in-out motion-reduce:duration-1
                            `}
                    onClick={(e) => { e.stopPropagation() }}>
                    <div className="flex fade-in duration-800 delay-300 easi-in-out items-center
                                     ">
                        <DateRangeSelector
                            lang={lang}
                            date={date}
                            setDate={setDate}
                            placeholder={dictionary.checkInOut}
                            dictionary={dictionary}
                            room={room}
                        />
                        <AiOutlineLine className="rotate-90 text-gold text-3xl" strokeWidth={20} />
                        <GuestSelector
                            count={guests}
                            setCount={setGuests}
                            placeholder={dictionary.ospiti}

                        />

                        {/* BTN DESKTOP */}
                        <BtnBase
                            className="bg-gold ms-3 text-gold  hidden md:flex hover:bg-background transition-all duration-300"
                            textClassName="text-foreground text-sm group-hover:text-foreground transition-all duration-300"
                            onClick={handleBook}
                        >
                            {buttonLabel || dictionary.prenota}
                        </BtnBase>
                    </div>
                </div>
            )}

            {/* BTN MOBILE */}

            {isOpen && (
                <div className="flex items-center justify-center">
                    <BtnBase
                        className={cn("bg-gold xs:h-12 text-gold h-10 px-9 xs:px-11  md:hidden hover:bg-background transition-all duration-300", classBtnBooktoNavBook)}
                        textClassName="text-foreground text-sm group-hover:text-foreground transition-all duration-300"
                        onClick={handleBook}
                    >
                        {buttonLabel || dictionary.prenota}
                    </BtnBase>
                </div>
            )}

            {/* OVERLAY LOADING — renderizzato fuori dal flusso DOM via portal */}
            {isLoading && typeof document !== 'undefined' && createPortal(
                <FullScreenLoader
                    label={lang === 'it' ? 'Stiamo preparando la tua esperienza...' : 'Preparing your experience...'}
                    sublabel={lang === 'it' ? 'Attendi qualche istante' : 'Please wait a moment'}
                />,
                document.body
            )}

        </div>
    )
}