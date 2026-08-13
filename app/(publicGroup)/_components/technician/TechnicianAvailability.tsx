import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IAvailability } from '@/lib/type'
import { CalendarDays, Clock3, ShieldCheck } from 'lucide-react'
import React from 'react'

const TechnicianAvailability = ({availability}:{availability:IAvailability}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(availability).map(([day, slots]) => (
            <div key={day} className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2 font-medium">
                <CalendarDays className="size-4" />

                <span className="capitalize">{day}</span>
              </div>

              <div className="space-y-1">
                {(slots as string[]).map((slot: string) => (
                  <div
                    key={slot}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Clock3 className="size-4" />
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0" />

          <p className="text-sm leading-6 text-muted-foreground">
            These are the technician&apos;s regular working hours. Actual
            booking slots may vary depending on existing bookings.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TechnicianAvailability
