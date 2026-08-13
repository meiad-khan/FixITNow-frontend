import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Service } from './TechnicianBooking'
import { Wrench } from 'lucide-react'

const TechnicianServices = ({services}:{services:Service[]}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Services Offered</CardTitle>
      </CardHeader>

      <CardContent>
        {services.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service: Service) => (
              <div
                key={service.id}
                className="flex items-center justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Wrench className="size-5 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium">{service.serviceName}</p>

                    <p className="text-xs text-muted-foreground">
                      Professional service
                    </p>
                  </div>
                </div>

                <span className="shrink-0 font-semibold">
                  ৳{service.basePrice}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No services available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default TechnicianServices
