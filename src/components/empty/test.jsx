import { cn } from "@/lib/utility"
export default function Test({ className }) {
    return (
        <div className={cn("flex w-full min-h-screen items-center justify-center", className)}>hello</div>
    )
}