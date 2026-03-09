import FullScreenLoader from "@/components/ui/fullScreenLoader"

export default function Loading() {
    return (
        <>
            {/* Skeleton specifico per la pagina booking */}
            <main className="min-h-screen bg-background pt-32 px-4 md:px-10 lg:px-20 pb-20 flex flex-col gap-8">
                {/* Header Skeleton */}
                <div className="flex flex-col gap-6 mb-4 animate-pulse">
                    <div className="h-12 w-64 bg-white/10 rounded-lg"></div>
                    <div className="flex gap-4">
                        <div className="h-8 w-48 bg-white/10 rounded-full"></div>
                        <div className="h-8 w-32 bg-white/10 rounded-full"></div>
                    </div>
                </div>

                {/* Cards Skeleton Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col gap-4 border border-white/10 p-6 rounded-[2rem] bg-white/5 h-[500px] animate-pulse">
                            <div className="w-full h-64 bg-white/10 rounded-2xl"></div>
                            <div className="flex flex-col gap-2 mt-4">
                                <div className="h-8 w-3/4 bg-white/10 rounded"></div>
                                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                                <div className="h-20 w-full bg-white/10 rounded mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <FullScreenLoader label="Controllo disponibilità in corso..." />
        </>
    )
}
