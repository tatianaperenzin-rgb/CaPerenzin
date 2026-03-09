
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import BtnBase from "../ui/btnBase"
import { sendEmail } from "@/components/form/sendEmail"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/form/form"
import { Input } from "@/components/form/input"
import { Textarea } from "@/components/form/textarea"
import { RiSendPlaneFill } from "react-icons/ri"

// 1. Definiamo le regole di validazione
// (Questo rimane identico, Zod funziona anche in JS per controllare i dati!)
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Il nome deve avere almeno 2 caratteri.",
    }),
    email: z.string().email({
        message: "Inserisci un'email valida.",
    }),
    phone: z.string().min(10, {
        message: "Inserisci un numero valido.",
    }),
    message: z.string().min(10, {
        message: "Il messaggio deve essere di almeno 10 caratteri.",
    }),
})

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 2. Inizializziamo il form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    // 3. Funzione che parte quando premi INVIA

    async function onSubmit(values) {
        setIsSubmitting(true)

        // Chiamiamo la Server Action passando i dati
        const result = await sendEmail(values)

        setIsSubmitting(false)

        if (result.success) {
            form.reset()
            alert("Messaggio inviato con successo!")
        } else {
            alert("C'è stato un errore. Riprova.")
            console.error(result.error)
        }
    }

    const iconSend = {
        send: RiSendPlaneFill
    }

    return (
        <div className="w-full max-w-md p-8 border border-gold/30 rounded-2xl backdrop-blur-sm">ç
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))} className="space-y-6">

                    {/* CAMPO NOME */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Il vostro nome"
                                        className="bg-transparent border-b-gold/50 text-foreground focus:border-gold placeholder:text-gold/50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    {/* CAMPO EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="La vostra e-mail"
                                        className="bg-transparent border-b-gold/50 text-foreground focus:border-gold placeholder:text-gold/50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    {/* CAMPO CELLULARE */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Il vostro telefono"
                                        className="bg-transparent border-b-gold/50 text-foreground focus:border-gold placeholder:text-gold/50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    {/* CAMPO MESSAGGIO */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Raccontateci i vostri desideri..."
                                        className="bg-transparent border-b-gold/50 text-foreground focus:border-gold placeholder:text-gold/50"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />

                    {/* BOTTONE */}
                    <BtnBase
                        type="submit"
                        disabled={isSubmitting}
                        iconStart={RiSendPlaneFill}
                        iconClassName="text-background group-hover:text-foreground transition-all duration-300"
                        btnClass="text-foreground hover:bg-gold transition-all duration-300"
                        textClassName="group-hover:text-foreground transition-all duration-300"
                    >
                        {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                    </BtnBase>
                </form>
            </Form>
        </div>
    )
}