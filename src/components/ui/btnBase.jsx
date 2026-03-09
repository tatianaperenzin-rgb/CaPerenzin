import { cn } from "@/lib/utility"

export default function BtnBase({
    children,
    className = "",
    iconEnd: IconEnd,
    iconStart: IconStart,
    textClassName,
    iconClassName,
    type = "button",
    href,
    btnClass,
    hrefClass,
    as,
    ...props
}) {

    const baseClass = cn(`flex justify-center bg-current rounded-full items-center gap-2 xs:gap-4 md:gap-3 cursor-pointer shrink-0
                            h-10 xs:h-12  lg:h-9 xl:h-10 
                            px-4 py-0 xs:px-5 xs:py-3 md:px-5
                            transition-all duration-300 group shadow-lg`, className)

    const content = (
        <>
            {/* Icona SINISTRA (Start) */}
            {IconStart && (
                <IconStart className={cn("text-background w-[22px] h-[22px]", iconClassName)} />
            )}

            <span className={cn("leading-none text-background text-xs xs:text-sm lg:text-sm pt-[0.3px]", textClassName)}>
                {children}
            </span>

            {/* Icona DESTRA (End) */}
            {IconEnd && (
                <IconEnd className={cn("text-background w-[22px] h-[22px]", iconClassName)} />
            )}
        </>
    )

    if (href) {
        const isExternal = href.startsWith('http') || href.startsWith('//')
        if (isExternal) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={cn("", baseClass, hrefClass)} {...props}>
                    {content}
                </a>
            )
        }
        return (
            <a href={href} className={cn("", baseClass, hrefClass)} {...props}>
                {content}
            </a>
        )
    }

    const Element = as || 'button'

    return (
        <Element type={Element === 'button' ? type : undefined} className={cn(baseClass, btnClass)} {...props}>
            {content}
        </Element>
    )
}