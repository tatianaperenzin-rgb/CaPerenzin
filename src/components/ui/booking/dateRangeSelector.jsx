"use client"

import * as React from "react"
import { format } from "date-fns"
import { it, enUS } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utility"
import { Button } from "@/components/ui/uiShadcn/button"
import { Calendar } from "@/components/ui/uiShadcn/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/uiShadcn/popover"

export function DateRangeSelector({ className, date, setDate, placeholder, lang, dictionary, room }) {
    // Stato per salvare le date occupate (prenotate) ricevute dall'API
    const [bookedDates, setBookedDates] = React.useState([])

    // Effetto: Quando cambia la stanza (room), chiediamo al server quali giorni sono occupati
    React.useEffect(() => {
        // Se non c'è una stanza o non ha un link al calendario ICS, non facciamo nulla (calendario standard)
        if (!room?.icsUrl) return

        async function fetchAvailability() {
            try {
                // Chiamata alla nostra API interna 'ponte' per leggere il file ICS esterno
                const res = await fetch(`/api/room-availability?icsUrl=${encodeURIComponent(room.icsUrl)}`)
                const data = await res.json()

                // Se riceviamo delle date, le convertiamo in oggetti Date di Javascript
                if (data.bookedDates) {
                    setBookedDates(data.bookedDates.map(d => new Date(d)))
                }
            } catch (e) {
                console.error("Failed to load availability", e)
            }
        }

        fetchAvailability()
    }, [room])

    const locales = {
        it: it,
        en: enUS
    }

    const currentLocale = locales[lang] || it

    return (
        <div className={cn("flex gap-2 md:px-2 md:ps-4", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"

                        className={cn("w-full !p-0",
                            !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mt-[-2px]" />
                        {date?.from ? (
                            date.to ? (
                                <span className="text-xs xs:text-sm  ">
                                    {format(date.from, "dd MMM", { locale: currentLocale })} -{" "}
                                    {format(date.to, "dd MMM", { locale: currentLocale })}
                                </span>
                            ) : (
                                <span className="text-xs xs:text-sm ">
                                    {format(date.from, "dd MMM yyyy", { locale: currentLocale })}
                                </span>
                            )
                        ) : (
                            <span className="text-xs">
                                {dictionary?.checkInOut || "Date"}
                            </span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 mb-1" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2} // Figo: mostra 2 mesi affiancati
                        locale={currentLocale}
                        // Passiamo le date occupate al calendario come modificatore "booked"
                        modifiers={{ booked: bookedDates }}
                        // Definiamo lo stile visivo per i giorni "booked" (Rosso, sbarrato, non cliccabile)
                        modifiersClassNames={{
                            booked: "bg-red-500/10 text-red-500 line-through decoration-red-500/50 cursor-not-allowed hover:bg-red-500/20"
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div >
    )
}