"use client"

import { cn } from "@/lib/utility"
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io"
import { AiOutlineLine } from 'react-icons/ai'
import BtnBase from "@/components/ui/btnBase"

export default function ControlsHome({ dictionaty, lang, totalRoom, onNext, onBack, onScrollTo, onSelect }) {

    return (

        <div className={cn(`flex flex-col justify-center rounded-full 
    pointer-events-none z-10
    items-center lg:items-start
                        
    absolute bottom-[-40px] left-1/2 
    -translate-x-1/2 translate-y-1/2 
    
    w-90 md:w-110 xl:w-130
    h-90 md:h-110 xl:h-130

    lg:bottom-auto lg:top-1/2
    lg:left-[-10px] xl:left-[-45px]
    lg:-translate-y-1/2 lg:-translate-x-1/2
                          
                          `)}>

            {/* 1. CERCIO SVG */}
            <div className={`flex  w-[60vh] h-[60vh] lg:w-[80vh] lg:h-[80vh]
            relative pointer-events-auto
            rotate-270 lg:rotate-0
                                max-w-[260px] max-h-[260px]
                                 xs:max-w-[320px] xs:max-h-[320px]
                                 md:max-w-[390px] md:max-h-[390px]
                                
                                xl:max-w-[500px] xl:max-h-[500px]
                                
                                rounded-full border-3 border-current
                                    justify-end `}>

                {/* CONTROS + COUNT */}
                <div className={`flex flex-col w-2/3 h-full justify-center items-center`}>
                    <div className={`flex lg:flex-col
                    rotate-90 lg:rotate-0
                        me-[-60] xs:me-[-40] md:me-[-60] lg:me-[-30] xl:me-[-60]`}>
                        {/* FRECCIA SU e num */}
                        <div className="flex lg:flex-col justify-center items-center">
                            <BtnBase
                                className="bg-transparent"
                                onClick={onNext}
                            >
                                <IoMdArrowRoundUp size={40} className="text-gold hidden md:block" />
                            </BtnBase>
                            <p className="text-lg">
                                {onSelect + 1}
                            </p>
                        </div>

                        {/* DIVIDER */}
                        <div className="flex lg:flex-col justify-start items-center">
                            <AiOutlineLine className="text-gold text-3xl rotate-90 lg:rotate-0" />
                        </div>

                        {/* FRECCIA GIU e num */}
                        <div className="flex lg:flex-col justify-center items-center">
                            <p className="text-lg">
                                {totalRoom}
                            </p>
                            <BtnBase
                                className="bg-transparent"
                                onClick={onBack}
                            >
                                <IoMdArrowRoundDown size={40} className="text-gold hidden md:block" />
                            </BtnBase>
                        </div>
                    </div>

                    {/* --- GENERAZIONE PALLINI --- */}
                    {Array.from({ length: totalRoom }).map((_, index) => {

                        // ============================================================
                        // 🎛️ CONFIGURAZIONE DISTANZA E SPAZIO (Tocca qui!)
                        // ============================================================

                        // 1. QUANTO APRIRE L'ARCO? (In Gradi)
                        // Se metti 30: i pallini sono vicinissimi (stretto)
                        // Se metti 90: i pallini occupano tutto il quarto di cerchio (largo)
                        // Se metti 180: coprono tutta la mezzaluna
                        const ARC_SCOPE = 90;

                        // 2. POSIZIONE SUL BORDO (In Percentuale)
                        // 50 = Esattamente sul bordo del div
                        // 48 = Appena dentro (consigliato)
                        // 52 = Appena fuori
                        const RADIUS = 50.3;

                        // ============================================================
                        // 📐 CALCOLI MATEMATICI (Non toccare se non serve)
                        // ============================================================

                        // Calcoliamo l'angolo di partenza e fine per centrarli sull'asse orizzontale
                        // Es: se l'arco è 60°, vado da -30° (su) a +30° (giù)
                        const startAngle = -(ARC_SCOPE / 2);

                        // Calcoliamo lo "step" (distanza angolare) tra un pallino e l'altro
                        // Se c'è solo 1 slide, lo step è 0.
                        const step = totalRoom > 1 ? ARC_SCOPE / (totalRoom - 1) : 0;

                        // L'angolo di QUESTO pallino specifico
                        const angleDeg = startAngle + (index * step);

                        // Convertiamo in Radianti (perché a Javascript piacciono i radianti)
                        const angleRad = (angleDeg * Math.PI) / 130;

                        // FORMULA DEL CERCHIO:
                        // Centro del div è 50%, 50%.
                        // x = 50% + (raggio * coseno(angolo))
                        // y = 50% + (raggio * seno(angolo))
                        const left = 50 + (RADIUS * Math.cos(angleRad)) + "%";
                        const top = 50 + (RADIUS * Math.sin(angleRad)) + "%";

                        return (
                            <button
                                key={index}
                                onClick={() => onScrollTo(index)}
                                className={cn(
                                    "absolute w-3 h-3 rounded-full border border-white transition-all duration-300 z-50",
                                    "-translate-x-1/2 -translate-y-1/2", // Centra il pallino su se stesso
                                    index === onSelect ? "bg-gold scale-150" : "bg-current hover:scale-150 animated ease-in-out duration-800"
                                )}
                                style={{
                                    left: left,
                                    top: top
                                }}
                            />
                        );
                    })}


                </div>

            </div>

        </div>
    )
}