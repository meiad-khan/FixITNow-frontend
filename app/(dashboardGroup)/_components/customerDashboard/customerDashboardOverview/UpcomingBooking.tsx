import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingResponse } from "@/lib/type"
import ViewBookingButton from "./ViewBookingButton"

export default function UpcomingBooking({
  bookings,
}: {
  bookings: BookingResponse
}) {
  const upcoming = bookings.data.find((b) =>
    ["ACCEPTED", "REQUESTED"].includes(b.status)
  )

  if (!upcoming) {
    return (
      <Card className="overflow-hidden border-muted/60">
        <CardContent className="p-6 text-sm text-muted-foreground">
          No upcoming bookings.
        </CardContent>
      </Card>
    )
  }

  const date = new Date(upcoming.scheduledAt)
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
  const technicianName = upcoming.service.technician.user.name
  const serviceName = upcoming.service.serviceName

  return (
    <Card className="overflow-hidden border-muted/60">
      {/* Header */}
      <CardHeader className="border-b bg-linear-to-r from-violet-50/80 to-transparent dark:from-violet-500/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <CalendarDays className="size-5" />
            </div>

            <div>
              <CardTitle className="text-base">Upcoming Booking</CardTitle>
              <p className="text-xs text-muted-foreground">
                Your next scheduled service
              </p>
            </div>
          </div>

          <Badge
            variant="outline"
            className="rounded-full border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
          >
            {upcoming.status === "ACCEPTED" ? "Confirmed" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Booking information */}
          <div className="space-y-5">
            {/* Service */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {serviceName}
                </h2>
                <CheckCircle2 className="size-5 text-emerald-500" />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {upcoming.customerNote}
              </p>
            </div>

            {/* Technician */}
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-purple-700 text-sm font-bold text-white shadow-sm">
                {technicianName.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Technician</p>
                <p className="font-semibold">{technicianName}</p>
              </div>
            </div>

            {/* Booking details */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
                <CalendarDays className="size-4 text-primary" />
                <span>{dateLabel}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
                <Clock3 className="size-4 text-primary" />
                <span>{timeLabel}</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2 text-sm">
                <span>৳{upcoming.price}</span>
              </div>
            </div>

            {/* Action */}
            <ViewBookingButton
              serviceName={serviceName}
              technicianName={technicianName}
              status={upcoming.status}
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              price={upcoming.price}
              customerNote={upcoming.customerNote}
            />
          </div>

          {/* Visual */}
          <div className="hidden size-40 items-center justify-center rounded-full bg-linear-to-br from-violet-100 via-purple-50 to-transparent lg:flex dark:from-violet-500/10 dark:via-purple-500/5">
            <div className="flex size-24 items-center justify-center rounded-3xl bg-background text-5xl shadow-xl">
              🔧
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
