import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClipboardList } from 'lucide-react'
import React from 'react'
import { bookingStats, totalBookings } from '../_config/dashboardUitls'

export default function BookingOverview() {
  return (
    <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b bg-linear-to-br from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="size-4" />
              </div>
              Booking Overview
            </CardTitle>

            <p className="mt-2 text-sm text-muted-foreground">
              Current booking activity
            </p>
          </div>

          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {totalBookings} Total
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 p-5 sm:grid-cols-2">
        {bookingStats.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="group/item flex items-center justify-between rounded-xl border bg-background p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-muted/40 hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover/item:scale-110 ${item.iconClass}`}
                >
                  <Icon className="size-4" />
                </div>

                <span className="text-sm font-medium">{item.title}</span>
              </div>

              <span className={`text-lg font-bold ${item.valueClass}`}>
                {item.value}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
