"use client"

import { usePathname, useParams, useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function LangSwitcher({ isMenuOpen }) {

    const [isOpen, setIsOpen] = useState(false)

    //leggiamo dove siamo 
    const params = useParams()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    //leggiamo la llingu acorrente
    const currentLang = params.lang || "it"

    //Se sono IT, l'altra è EN. Se sono EN, l'altra è IT
    const nextLang = currentLang === "it" ? "en" : "it"

    //funzione per leggere e cambiare lingia dal url
    const redirectPathName = (locale) => {
        if (!pathName) return "/"
        //spezzetto l'url per modoficarlo
        const segment = pathName.split("/")
        //cambiar la parte 1 dopo lo / cioe la parte 2 
        segment[1] = locale
        //ricreo l'url cambiando da it in en o viceversa
        // manteniamo i parametri (es. ?info=1 nella camera, date nel booking)
        const query = searchParams.toString()
        return segment.join("/") + (query ? `?${query}` : "")
    }

    const handleClick = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`flex flex-col shrink-0 justify-around rounded-full text-center absolute top-0 right-0 z-10
                        w-10  xs:w-11 xs:h-11 cursor-pointer
                        transfor-all duration-300 easi-in-out
                        ${isOpen ? "h-20 xs:h-25" : "h-10"}
                        ${isOpen ? "py-3" : "py-0"}
                        ${isMenuOpen ? "bg-background" : "bg-gold"}`}>

            <button
                onClick={handleClick}
                className="text-sm xs:text-base">
                {currentLang.toUpperCase()}
            </button>

            <Link href={redirectPathName(nextLang)}
                onClick={() => {
                    setIsOpen(false)
                    // segnale per la pagina nuova: niente splash e menu riaperto se era aperto
                    sessionStorage.setItem("langSwitch", isMenuOpen ? "menu" : "page")
                }}
                className={`cursor-pointer ${isOpen ? "block" : "hidden"}
                hover:text-black
                text-sm xs:text-base`}>
                {nextLang.toUpperCase()}
            </Link>

        </div>
    )
}