import { Suspense } from "react"
import TechnicianSearch from "./technician-search"
import TechnicianSkeleton from "./technician-skeleton"
import { TechnicianResults } from "./technician-results"

export function TechnicianContent() {
  return (
    <div className="w-full space-y-8">
      {/* Heading + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Available Technicians
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Find skilled professionals for your needs
          </p>
        </div>

        <TechnicianSearch />
      </div>

      {/* Only dynamic content */}
      <Suspense fallback={<TechnicianSkeleton />}>
         <TechnicianResults />
       </Suspense>
    </div>
  )
}
