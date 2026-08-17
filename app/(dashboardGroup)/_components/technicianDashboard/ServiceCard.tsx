import { Wrench, Tag } from "lucide-react"
import { formatTaka } from "./dashboard-utils"

interface Service {
  id: string
  serviceName: string
  description: string
  basePrice: string
  status: string
  category: { categoryName: string }
}

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-emerald-50 text-emerald-700",
  UNAVAILABLE: "bg-red-50 text-red-700",
}

export function ServiceCard({ service }: { service: Service }) {
  const statusStyle =
    STATUS_STYLES[service.status] ?? "bg-muted text-muted-foreground"

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="pointer-events-none absolute -top-10 -right-8 h-28 w-28 rounded-full bg-violet-100/60 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <Wrench className="h-5 w-5 text-violet-600" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyle}`}
        >
          {service.status}
        </span>
      </div>

      <h3 className="relative mt-4 font-serif text-lg font-semibold">
        {service.serviceName}
      </h3>

      <p className="relative mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        <Tag className="h-3 w-3" />
        {service.category.categoryName}
      </p>

      <p className="relative mt-3 line-clamp-2 text-sm text-muted-foreground">
        {service.description}
      </p>

      <div className="relative mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Starting at</span>
        <span className="font-serif text-xl font-bold">
          {formatTaka(Number(service.basePrice))}
        </span>
      </div>
    </div>
  )
}
