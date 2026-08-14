import { getAllTechnician } from "../../_actions/technicianActions/technicianActions"
import { Technician, TechnicianCard } from "./technician-card"

export async function TechnicianResults({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    const query = await searchParams;
    // console.log("searchTerm is ", query);
  
    const result = await getAllTechnician({query})

    // console.log("result is ", result);

    if (!result.success || !result.data?.length) {
      return (
        <div className="flex min-h-100 items-center justify-center rounded-xl border bg-background">
          <div className="px-6 text-center">
            <h3 className="text-lg font-semibold">No technicians found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your search or filter options.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full min-w-0 space-y-6">
        {/* Result count */}
        <p className="text-sm text-muted-foreground">
          {result.meta?.total ?? result.data.length} technicians available
        </p>

        {/* Technician Grid */}
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {result.data.map((technician: Technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
      </div>
    )
  }
