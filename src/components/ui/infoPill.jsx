
import { cn } from "@/lib/utility"

export default function InfoPill({ children, className, href, IconStart, iconClassName, ...props }) {


    const baseClass = cn(`flex py-2 xs:py-2 md:py-1.5
                        px-3 xs:px-4 shadow-lg
                        rounded-full bg-foreground
                        gap-2 
                        text-[10px] xs:text-xs text-background items-center justify-center
                        w-fit whitespace-nowrap`, className)


    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:bg-gold transition-all duration-300 hover:text-foreground ${baseClass}`}
                {...props}
            >
                {/* Icona SINISTRA (Start) */}
                {IconStart && (
                    <IconStart className={cn("text-background w-[15px] h-[15px] xs:w-[18px] xs:h-[18px] md:w-[20px] md:h-[20px]", iconClassName)} />
                )}
                {children}
            </a>
        )
    }

    return (
        <div className={baseClass} {...props}>

            {/* Icona SINISTRA (Start) */}
            {IconStart && (
                <IconStart className={cn("text-background w-[15px] h-[15px] xs:w-[20px] xs:h-[20px]", iconClassName)} />
            )}

            {children}
        </div>
    )
}