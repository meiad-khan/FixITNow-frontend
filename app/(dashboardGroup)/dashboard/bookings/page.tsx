import { getMyBookings } from "@/app/(dashboardGroup)/_actions/customerDashboard"
import { CalendarDays, Clock3 } from "lucide-react"

import { Card, CardContent} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import BookingStatusBadge, { type BookingStatus } from "../../_components/customerDashboard/BookingStatusBadge"
import { BookingResponse } from "@/lib/type"
import BookingActions from "../../_components/customerDashboard/BookingActions"

// Controls section order + labels shown on the page
const STATUS_ORDER: { status: BookingStatus; label: string }[] = [
  { status: "REQUESTED", label: "Requested" },
  { status: "ACCEPTED", label: "Accepted" },
  { status: "PAID", label: "Paid" },
  { status: "IN_PROGRESS", label: "In Progress" },
  { status: "COMPLETED", label: "Completed" },
  { status: "DECLINED", label: "Declined" },
  { status: "CANCELLED", label: "Cancelled" },
]

export default async function BookingPage() {
  const bookings: BookingResponse = await getMyBookings()

  const grouped = STATUS_ORDER.map(({ status, label }) => ({
    status,
    label,
    items: bookings.data.filter((b) => b.status === status),
  })).filter((group) => group.items.length > 0)

  if (grouped.length === 0) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        You don&apos;t have any bookings yet.
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 sm:p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Booking History</h1>
        <p className="text-sm text-muted-foreground">
          All your past and current bookings
        </p>
      </div>

      {grouped.map((group) => (
        <div key={group.status} className="space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{group.label}</h2>
            <span className="text-sm text-muted-foreground">
              ({group.items.length})
            </span>
          </div>

          <Card className="overflow-hidden border-muted/60">
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-1">
                {group.items.map((booking, index) => {
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
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-semibold">
                              {serviceName}
                            </h3>
                            <p className="truncate text-sm text-muted-foreground">
                              {technicianName}
                            </p>
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
                            <span className="font-semibold">
                              ৳{booking.price}
                            </span>
                            <BookingStatusBadge status={booking.status} />
                          </div>
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

                      {index !== group.items.length - 1 && (
                        <Separator className="mx-3" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
