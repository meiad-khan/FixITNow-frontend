import { PackageOpen } from "lucide-react"
import { ServiceCard } from "./ServiceCard"

interface Service {
  id: string
  serviceName: string
  description: string
  basePrice: string
  status: string
  category: { categoryName: string }
}

export function ServiceGrid({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-16 text-center">
        <PackageOpen className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="font-medium">No services added yet</p>
        <p className="text-sm text-muted-foreground">
          Services you offer will show up here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
