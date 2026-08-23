import { Suspense } from "react"
import TechnicianSearch from "./technician-search"
import TechnicianSkeleton from "./technician-skeleton"
import { TechnicianResults } from "./technician-results"
import Pagination from "@/app/(dashboardGroup)/admin-dashboard/users/_components/Pagination"
import { getAllTechnician } from "../../_actions/technicianActions/technicianActions"

export async function TechnicianContent({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
      const query = await searchParams;
      // console.log("searchTerm is ", query);    
  const result = await getAllTechnician({ query })
  const meta = result.meta;
  
  
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
        <TechnicianResults result={result} />
      </Suspense>
      <Pagination meta={meta} field={"technicians"} />
    </div>
  )
}
