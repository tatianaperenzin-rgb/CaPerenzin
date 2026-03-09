
import { cn } from "@/lib/utility"

export default function PopUpA({ children, dictionary, lang, className, ...props }) {
    return (
        <div className={cn("flex w-full h-svh lg:h-dvh overflow-x-hidden", className)}
            {...props}
        >
            {children}
        </div>
    )
}