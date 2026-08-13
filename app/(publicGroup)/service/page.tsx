import { Button } from "@/components/ui/button"
import { ServiceContent } from "../_components/service/service-content"
import ServiceFilter from "../_components/service/service-filter"

export default function ServicePage() {
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
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted-foreground">
            Showing available services
          </p>

          <Button variant="outline">Filters</Button>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Desktop filters */}
          <aside className="hidden lg:block"> <ServiceFilter /> </aside>

          {/* Service content */}
          <div className="min-w-0">
            <ServiceContent />
          </div>
        </div>
      </div>
    </div>
  )
}
