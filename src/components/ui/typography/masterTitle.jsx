import { cn } from "@/lib/utility"

export default function MasterTitle({ children, className = "", tag = "h1" }) {

    const Tag = tag

    return (
        <Tag className={cn(`font-black text-4xl xs:text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-9xl
                       
                       ${className}`)}>
            {children}
        </Tag>
    )
}