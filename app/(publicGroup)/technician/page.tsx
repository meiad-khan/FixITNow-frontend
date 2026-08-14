import { Button } from "@/components/ui/button"
import { TechnicianContent } from "../_components/technician/technician-content"
import TechnicianFilter from "../_components/technician/technician-filter"
import { getAllTechnician } from "../_actions/technicianActions/technicianActions"
import { Technician } from "../_components/technician/technician-card"
import { getAllCategory } from "../_actions/serviceActions/serviceActions"
import { Category } from "@/lib/type"

export default async function TechnicianPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
  // const searchTerm = await searchParams;
  // console.log("searchTerm is ", searchTerm);

  const technician = await getAllTechnician({})
    const technicianLocation: string[] = [...new Set(
      (technician.data as Technician[]).map((tech) => tech.location)
    )];
  
    const categories = await getAllCategory();
    // console.log("categories is ", categories);
    const categoryNames = [...new Set(
      (categories.data as Category[]).map((category)=>category.categoryName)
    )]


  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-2 text-sm font-medium text-primary">
            FixItNow Technicians
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Find a trusted technician
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse skilled professionals, compare experience and ratings, and
            choose the right technician for your job.
          </p>
        </div>

        {/* Mobile filter button */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted-foreground">
            Showing available technicians
          </p>

          <Button variant="outline">Filters</Button>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <TechnicianFilter
              technicianLocation={technicianLocation}
              categoryNames={categoryNames}
            />
          </aside>

          {/* Dynamic content */}
          <div className="min-w-0">
            <TechnicianContent searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  )
}
