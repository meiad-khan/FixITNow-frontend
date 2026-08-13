import { Suspense } from "react"

import ServiceSearchCard from "./serviceSearch"
import { ServiceResults } from "./service-results"
import ServiceSkeleton from "./service-skeleton"

export function ServiceContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="w-full space-y-4">
      {/* Heading + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Available Services
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Find the right service for your needs
          </p>
        </div>

        <ServiceSearchCard />
      </div>

      {/* Only dynamic content */}
      <Suspense fallback={<ServiceSkeleton />}>
        <ServiceResults searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
