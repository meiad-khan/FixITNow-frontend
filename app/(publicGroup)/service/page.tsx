import { ServiceContent } from "../_components/service/service-content"
import ServiceFilter from "../_components/service/service-filter"
import { getAllTechnician } from "../_actions/technicianActions/technicianActions"
import { getAllCategory } from "../_actions/serviceActions/serviceActions"
import { Category, Data } from "@/lib/type"
import MobileServiceFilter from "../_components/service/mobile-service-filter"

export default async function ServicePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
  const technician = await getAllTechnician({})
  const technicianLocation: string[] = [
    ...new Set((technician.data as Data[]).map((tech) => tech.location)),
  ]

  const categories = await getAllCategory();
  // console.log("categories is ", categories);
  const categoryNames = [...new Set(
    (categories.data as Category[]).map((category)=>category.categoryName)
  )]
  
  // console.log("names ", categoryNames);
  // console.log('Locaiton ', technicianLocation);
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-2 text-sm font-medium text-primary">
            FixItNow Services
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Find the right professional for your job
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse trusted technicians, compare ratings, and find the right
            service for your home.
          </p>
        </div>

        {/* Mobile filter button */}
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <p className="text-sm text-muted-foreground">
            Showing available services
          </p>

          <MobileServiceFilter
            technicianLocation={technicianLocation}
            categoryNames={categoryNames}
          />
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <ServiceFilter
              technicianLocation={technicianLocation}
              categoryNames={categoryNames}
            />
          </aside>

          {/* Service content */}
          <div className="min-w-0">
            <ServiceContent searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  )
}
