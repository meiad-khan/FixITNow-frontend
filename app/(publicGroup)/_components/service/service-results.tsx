import { Service, ServiceResponse } from "../../service/_config/type"
import { ServiceCard } from "./service-card"

export async function ServiceResults({ result }: { result: ServiceResponse }) {
  // console.log("service is ", result);

  if (!result?.success||!result.data?.length) {
    return (
      <div className="flex min-h-100 items-center justify-center rounded-xl border bg-background">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No services found</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your search or filter options.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 min-h-200">
      {/* Service count */}
      <div className="text-sm text-muted-foreground">
        {result.meta?.total ?? result.data.length} services available
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {result.data.map((service: Service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
