"use client"

import { Loader2Icon } from "lucide-react"

export default function FullScreenLoader({ label, sublabel }) {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/70 backdrop-blur-lg animate-in fade-in duration-400">

            {/* Spinner */}
            <Loader2Icon
                className="w-14 h-14 text-gold animate-spin"
                strokeWidth={1.5}
            />

            {/* Testo principale */}
            {label && (
                <p className="mt-8 text-lg md:text-xl text-white/90 tracking-widest text-center px-6 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200">
                    {label}
                </p>
            )}

            {/* Sottotesto */}
            {sublabel && (
                <p className="mt-2 font-muller text-sm text-white/50 tracking-wide animate-in fade-in slide-in-from-bottom-1 duration-500 delay-400">
                    {sublabel}
                </p>
            )}
        </div>
    )
}
