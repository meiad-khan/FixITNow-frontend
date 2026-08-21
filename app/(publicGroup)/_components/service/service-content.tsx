import { Suspense } from "react"

import ServiceSearchCard from "./serviceSearch"
import { ServiceResults } from "./service-results"
import ServiceSkeleton from "./service-skeleton"
import Pagination from "@/app/(dashboardGroup)/admin-dashboard/users/_components/Pagination"
import { getAllServices } from "../../_actions/serviceActions/serviceActions"

export async function ServiceContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
  const query = await searchParams;
  
  const result = await getAllServices({ query });
  const meta = result.meta ?? {};
 
  
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
        <ServiceResults result={result} />
      </Suspense>
      <Pagination meta={meta} />
    </div>
  )
}
