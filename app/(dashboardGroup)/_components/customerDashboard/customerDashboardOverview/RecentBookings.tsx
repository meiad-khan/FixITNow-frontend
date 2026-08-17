import { ArrowUpRight, CalendarDays, Clock3, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


import { BookingResponse } from "@/lib/type"
import BookingStatusBadge from "../BookingStatusBadge"
import BookingActions from "../BookingActions"

export default function RecentBookings({
  bookings,
}: {
  bookings: BookingResponse
}) {
  const recentBookings = bookings.data

  return (
    <Card className="overflow-hidden border-muted/60">
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <CardTitle className="text-base">Recent Bookings</CardTitle>
              <p className="text-xs text-muted-foreground">
                Your latest service activity
              </p>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            View All
            <ArrowUpRight className="ml-1 size-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        <div className="space-y-1">
          {recentBookings.map((booking, index) => {
            const date = new Date(booking.scheduledAt)
            const dateLabel = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            const timeLabel = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            const technicianName = booking.service.technician.user.name
            const serviceName = booking.service.serviceName

            return (
              <div key={booking.id}>
                <div className="group rounded-xl p-3 transition-colors hover:bg-muted/50">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                    {/* Service */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-lg">
                        <Wrench className="size-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {serviceName}
                        </h3>
                        <p className="truncate text-sm text-muted-foreground">
                          {technicianName}
                        </p>
                      </div>
                    </div>

                    {/* Booking information */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        <span>{dateLabel}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock3 className="size-3.5" />
                        <span>{timeLabel}</span>
                      </div>
                    </div>

                    {/* Price + Status */}
                    <div className="flex items-center justify-between gap-4 xl:min-w-45 xl:justify-end">
                      <span className="font-semibold">৳{booking.price}</span>
                      <BookingStatusBadge status={booking.status} />
                    </div>

                    {/* View */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden size-8 xl:flex"
                    >
                      <ArrowUpRight className="size-4" />
                      <span className="sr-only">View {serviceName}</span>
                    </Button>
                  </div>

                  {/* Customer action */}
                  <div className="mt-3 flex justify-end">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                      role="CUSTOMER"
                    />
                  </div>
                </div>

                {index !== recentBookings.length - 1 && (
                  <Separator className="mx-3" />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile View All */}
        <Button variant="outline" className="mt-4 w-full sm:hidden">
          View All Bookings
          <ArrowUpRight className="ml-2 size-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
