import { cn } from "@/lib/utility"

export default function MasterTitle({ children, className = "", tag = "h1" }) {

    const Tag = tag

    return (
        <Tag className={cn(`font-black text-3xl xxs:text-4xl xs:text-5xl md:text-7xl lg:text-7xl xl:text-7xl 2xl:text-8xl
                       
                       ${className}`)}>
            {children}
        </Tag>
    )
}