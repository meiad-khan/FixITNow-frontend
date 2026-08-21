import { ArrowRight, BadgeCheck, UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Service } from "../../service/_config/type"



interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Top accent */}
      <div className="h-1 w-full bg-primary" />

      <CardHeader className="space-y-4">
        {/* Category + Status */}
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{service.category.categoryName}</Badge>

          <Badge
            variant={service.status === "AVAILABLE" ? "default" : "outline"}
            className="gap-1"
          >
            {service.status === "AVAILABLE" && (
              <span className="size-1.5 rounded-full bg-background" />
            )}

            {service.status}
          </Badge>
        </div>

        {/* Title */}
        <div>
          <h3 className="line-clamp-2 text-lg leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary">
            {service.serviceName}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {service.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        {/* Technician */}
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background">
            <UserRound className="size-4 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Provided by</p>

            <div className="mt-0.5 flex items-center gap-1">
              <p className="truncate text-sm font-medium">
                {service.technician.user.name}
              </p>

              <BadgeCheck className="size-4 shrink-0 text-primary" />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>

            <p className="mt-1 text-2xl font-bold tracking-tight">
              ৳{Number(service.basePrice).toLocaleString()}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">per service</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full gap-2" variant="outline">
          View Service
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
