"use state"

import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import BtnBase from '../ui/btnBase'
import SmartBackground from '../image/smartBackround'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { size } from 'zod'

export default function ExpCarousell({ dictionary, exp, lang, experienceLibrary, onClick }) {

    const [isActive, setIsActive] = useState(experienceLibrary.experience[0]?.id || null)
    const dataExperience = experienceLibrary.experience.find(exp => exp.id === isActive) || experienceLibrary.experience[0]

    // Opzioni: loop true per l'infinito, align start per allinearli a sinistra
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
    const scrollNext = () => emblaApi && emblaApi.scrollNext()

    const arrowClass = "w-[40px] h-[40px] text-foreground text-gold cursor-pointer hover:scale-110 transition-all duration-300"

    return (
        // 1. WRAPPER ESTERNO: Posizionamento assoluto
        <div className="flex flex-col w-full xl:w-1/2 absolute bottom-7 left-4 xl:left-auto xl:right-0 z-50 gap-3">

            {/* CONTROLLER */}
            <div className='hidden xl:flex bg-transparent justify-end gap-3 pe-8'>
                {/* GO NEXT */}
                <IoIosArrowDropleftCircle onClick={scrollNext} className={arrowClass} />
                {/* GO PREV */}
                <IoIosArrowDroprightCircle onClick={scrollPrev} className={arrowClass} />
            </div>

            {/* 2. VIEWPORT: Nasconde l'overflow e definisce l'area visibile per Embla */}
            <div className="overflow-hidden" ref={emblaRef}>
                {/* 3. CONTAINER: Il trenino flessibile che si muove */}
                <div className="flex">
                    {experienceLibrary.experience.map((item, index) => (
                        <div className="flex-[0_0_auto] min-w-0 mr-7" key={item.id}>
                            {/* CARD */}
                            <div onClick={() => {
                                onClick(item.id)
                                emblaApi?.scrollTo(index)
                            }}
                                className="w-max h-auto p-7 bg-gold rounded-2xl xl:rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 border border-gold/20 shadow-xl"
                            >
                                <SmartBackground
                                    srcDesktop={item?.srcDesk}
                                    srcMobile={item?.srcDesk}
                                    srcAlt={item?.srcAlt}
                                    className='absolute inset-0 z-0 object-cover group-hover:scale-115 transition-transform duration-500'
                                />
                                <div className="absolute inset-0 bg-black/50 z-0" />
                                <span className="relative z-10">{item.headline}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}