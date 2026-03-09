"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { useState, useEffect } from "react"
import { useUI } from "@/hooks/contexUi"
import { RiMenu4Line } from "react-icons/ri"
import LangSwitcher from "@/components/ui/langSwitcher"
import Logo from "@/components/image/logo"
import Menu from "./menu"
import BubbleFrame from "./bubbleFrame"
import BookingNav from "./booking/bookingNav"
import { LuLogOut } from "react-icons/lu"




export default function NavBar({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen, disableMenuOverlay = false, dictionary, lang
}) {

    const [internalIsOpen, setInternalIsOpen] = useState(false)
    const [bookNavOpen, setBookNavOpen] = useState(false)

    const { navState, experienceActive, setIsMenuOpen, roomInfoActive, isLargeView, bubbleTest, setBubbleTest } = useUI() // Prendi il valore dal contesto
    const pathname = usePathname()

    const isMenu = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen

    useEffect(() => {
        setIsMenuOpen(isMenu)
    }, [isMenu, setIsMenuOpen])

    const toggleMenu = () => {
        if (controlledSetIsOpen) {
            controlledSetIsOpen(!isMenu)
        } else {
            setInternalIsOpen(!isMenu)
        }
    }

    const setMenuState = (value) => {
        if (controlledSetIsOpen) {
            controlledSetIsOpen(value)
        } else {
            setInternalIsOpen(value)
        }
    }

    const expandBookNav = () => {
        setBookNavOpen(!bookNavOpen)
    }

    // Blocca lo scroll del body quando il menu è aperto
    useEffect(() => {
        if (isMenu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "" // Ripristina lo scroll
        }

        // Cleanup function per ripristinare lo scroll quando il componente viene smontato
        return () => {
            document.body.style.overflow = ""
        }
    }, [isMenu])

    if (pathname?.includes("/policy") || pathname?.includes("/termsofuse")) return null

    return (
        <>
            <header className={`fixed overflow-hidden z-100 flex w-full top-0 left-0 pointer-events-none`}
            >
                {/* pointer-events-none permette di cliccare il sito sotto. La NavBar ha pointer-events-auto. */}
                <BubbleFrame className="pointer-events-none" bubbleClass="pointer-events-none" color="bg-transparent">



                    <div className={`flex w-full mt-5 justify-between absolute top-0 left-0 z-10
                        ${disableMenuOverlay ? 'opacity-100' : 'max-h-0 opacity-0 animateDelay'}
                        px-3 pointer-events-auto`}

                        style={disableMenuOverlay ? {} : { animationDelay: '2000ms' }}>

                        <div className={`${(isMenu || pathname?.includes("contatti") || experienceActive || roomInfoActive) ? "pointer-events-none" : ""}`}>
                            <Link href={`/${lang}`}>
                                <Logo className={`w-[40px] h-[40px] xl:w-[50px] xl:h-[50px] transition-opacity duration-300 ${(isMenu || pathname?.includes("contatti") || experienceActive || roomInfoActive || isLargeView) ? "opacity-0" : "opacity-100"}`} />
                            </Link>
                        </div>

                        <div className="flex  gap-3">
                            {/* BOOKNAV ONLT MENU OPEN */}
                            {/* {(isMenu || bubbleTest) && dictionary && (
                                <BookingNav
                                    dictionary={dictionary}
                                    lang={lang}
                                    bookNavOpen={bookNavOpen}
                                    setBookNavOpen={setBookNavOpen}
                                    expandBookNav={expandBookNav}
                                    alwaysOpen={bubbleTest}
                                    btnClassName={`flex rounded-full items-center gap-2 cursor-pointer
                                    shrink-0 xs:h-11 2xl:h-11.5
                                    px-4 py-0 xs:px-5 xs:py-3`}
                                />
                            )}
 */}
                            {/* MENU BTN */}
                            <div className={`flex gap-12 xs:gap-13 ${bubbleTest ? "lg:hidden" : ""}`}>
                                <button onClick={toggleMenu}
                                    className={`flex rounded-full items-center gap-2 cursor-pointer
                                    shrink-0 h-10 xs:h-11
                                    px-4 py-0 xs:px-5 xs:py-3
                                    ${isMenu ? "bg-background" : "bg-gold"}
                                    `}>
                                    <span className="leading-none text-sm xs:text-base">
                                        MENU
                                    </span>
                                    {!isMenu ? (
                                        <RiMenu4Line size={20} />
                                    ) : (
                                        <LuLogOut size={20} />
                                    )}
                                </button>

                                {/* CONTAINER LANG BTN */}
                                <div className="relative">
                                    <LangSwitcher isMenuOpen={isMenu} />
                                </div>
                            </div>


                        </div>
                    </div>

                    {!disableMenuOverlay && isMenu && <Menu setIsOpen={setMenuState} dictionary={dictionary.menu} hero={dictionary.hero} dataRooms={dictionary.dataRooms} lang={lang} />}
                </BubbleFrame>
            </header>

        </>
    )
}