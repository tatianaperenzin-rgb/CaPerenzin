"use client"

import { BsPerson, BsDashCircle, BsPlusCircle } from "react-icons/bs"

export function GuestSelector({ count, setCount, placeholder, dictionary }) {

    const increment = () => setCount(prev => Math.min(prev + 1, 7)) // Max 10
    const decrement = () => setCount(prev => Math.max(prev - 1, 1))  // Min 1

    return (
        <div className="flex items-center justify-between gap-2">
            {/* LABEL */}
            <div className="flex items-center gap-1 text-sm text-background md:px-2">
                <BsPerson className="w-5 h-5" />
                <span className="text-xs hidden md:block">
                    {placeholder}
                </span>
            </div>

            {/* COUNTER */}
            <div className="flex items-center gap-3 md:pe-2">
                <button onClick={decrement} className="text-gray-400 hover:text-gold transition-colors" type="button">
                    <BsDashCircle size={15} />
                </button>

                <span className="font-bold text-sm w-3 lg:w-4 text-center text-background">{count}</span>

                <button onClick={increment} className="text-gray-400 hover:text-gold transition-colors" type="button">
                    <BsPlusCircle size={15} />
                </button>
            </div>
        </div>
    )
}