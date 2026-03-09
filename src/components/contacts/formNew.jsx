"use client"

import { useState, useEffect } from "react"
import { sendEmail } from "@/hooks/sendEmail"
import BtnBase from "../ui/btnBase"
import { IoCloseSharp } from "react-icons/io5"
// Importiamo framer-motion per l'animazione dell'altezza
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/contacts/checkBox"


import { FormWrapper, InputField, TextAreaFieldAuto } from "@/components/contacts/formComponents"

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

// Questo componente wrapper serve perché useGoogleReCaptcha deve stare DENTRO il provider
function FormContent({ onClose, data, dictionary }) {

    const wrapClass = "pb-3"
    // Stati: 'idle' | 'loading' | 'success' | 'error'
    const [status, setStatus] = useState('idle')
    const [terms, setTerms] = useState(false)

    const { executeRecaptcha } = useGoogleReCaptcha()

    async function handleSubmit(e) {
        e.preventDefault()
        if (!terms) return

        setStatus("loading")

        if (!executeRecaptcha) {
            console.error("Execute recaptcha not yet available")
            setStatus("error")
            return
        }

        const token = await executeRecaptcha('contact_form')

        const formData = new FormData(e.currentTarget)
        formData.append('token', token)

        const [result] = await Promise.all([
            sendEmail(formData),
            new Promise(r => setTimeout(r, 1500))
        ])

        if (result.success) {
            setStatus("success")
        } else {
            console.error(result.error)
            setStatus("error")
        }
    }


    return (
        <div className={`flex w-full h-dvh absolute top-0  backdrop-blur-xl  items-center justify-center px-7  xl:relative xl:w-1/2
                         ${status === "success" ? "bg-background" : null} `}>
            <AnimatePresence mode="wait">

                {status === "success" ? (
                    <div className="flex flex-col gap-7">
                        <p className="font-bold text-gold text-2xl xl:text-3xl">{dictionary.success}</p>
                        <BtnBase>
                            {dictionary.homeBtn}
                        </BtnBase>
                    </div>
                ) : (
                    <motion.div
                        key="form-container" // Key aggiunto per permettere ad AnimatePresence di distiguere i componenti
                        // Animazione di entrata e uscita del box
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, height: 0 }} // Quando si chiude
                        className="relative z-10"
                    >
                        <FormWrapper
                            id="form-artefatto-singolo"
                            onSubmit={handleSubmit}
                            wrapperClassName={`flex flex-col 
                    items-center justify-center
                    
                    py-15 xs:py-15 md:py-20 xl:py-0 xl:pt-15 xl:pb-7
                    px-10 md:px-20 lg:px-20 xl:px-17 
                    
                    bg-gradient-to-br from-black/30 via-white/5 to-transparent backdrop-blur-xl
                     rounded-3xl xl:rounded-[40px] border border-white/10 border-t-white/20 border-l-white/20
                    border-gold bg-background/80
                    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]
                    overflow-hidden transition-all duration-500
                    ${status === "loading" ? "border-none" : null}
                   
                    `}
                        >

                            {/* TASTO CHIUDI (Visibile solo se non sta caricando/successo) */}
                            {status === 'idle' || status === 'error' ? (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute top-5 right-7 cursor-pointer z-50 text-acid transition-colors"
                                >
                                    <IoCloseSharp size={25} />
                                </button>
                            ) : null}

                            {/* --- GESTIONE CONTENUTO INTERNO --- */}
                            <AnimatePresence mode="wait">

                                {/* 1. STATO IDLE: IL FORM NORMALE */}
                                {status === 'idle' && (
                                    <motion.div
                                        key="form-content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="w-full flex flex-col gap-12"
                                    >
                                        <div className="flex flex-col w-full gap-7 xs:gap-9 lg:gap-10 xl:gap-15">
                                            <InputField labelClassName={wrapClass} label="" name="name" placeholder={dictionary.name} required />
                                            <div className="flex flex-col xl:flex-row gap-7 xs:gap-9 lg:gap-10  2xl:gap-20">
                                                <InputField labelClassName={wrapClass} label="" name="email" type="email" placeholder={dictionary.mail} required />
                                                <InputField labelClassName={wrapClass} label="" name="phone" type="number" placeholder={dictionary.phone} required />
                                            </div>
                                            <TextAreaFieldAuto labelClassName={wrapClass} rows="1" label="" name="message" placeholder="Raccontateci i vostri desideri..." required />

                                            <div className="flex gap-3 mt-7">
                                                <Checkbox
                                                    id="terms"
                                                    checked={terms}
                                                    onCheckedChange={(checked) => setTerms(checked === true)}
                                                />
                                                <p className="font-muller text-xs" htmlFor="terms">
                                                    {dictionary.gdpr}
                                                </p>
                                            </div>

                                            {/* Usiamo AnimatePresence per farlo sfumare via elegantemente */}
                                            <AnimatePresence>
                                                {status === 'idle' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        className="flex w-full justify-end"
                                                    >
                                                        <BtnBase
                                                            type="submit"
                                                            form="form-artefatto-singolo"
                                                            disabled={!terms}
                                                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {dictionary.send}
                                                        </BtnBase>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </div>



                                    </motion.div>
                                )}

                                {/* 2. STATO LOADING: CLESSIDRA O TESTO */}
                                {status === 'loading' && (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center justify-center gap-7"
                                    >
                                        {/* Sostituisci con uno spinner se ce l'hai, altrimenti testo pulsante */}

                                        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>




                                    </motion.div>
                                )}



                                {/* 4. STATO ERROR: MESSAGGIO ROSSO + RETRY */}
                                {status === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-10 gap-4 text-center"
                                    >
                                        <h3 className="text-xl text-red-500 font-bold uppercase">{dictionary.error}!</h3>
                                        <p className="text-white/70">{dictionary.textError}</p>
                                        <button
                                            type="button"
                                            onClick={() => setStatus('idle')} // Torna al form per riprovare
                                            className="text-acid underline hover:text-white mt-2"
                                        >
                                            {dictionary.newTry}
                                        </button>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </FormWrapper>
                    </motion.div>
                )}

            </AnimatePresence>

        </div>
    )

}

export default function FormNew({ onClose, data, dictionary }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            <FormContent onClose={onClose} data={data} dictionary={dictionary} />
        </GoogleReCaptchaProvider>
    )
}