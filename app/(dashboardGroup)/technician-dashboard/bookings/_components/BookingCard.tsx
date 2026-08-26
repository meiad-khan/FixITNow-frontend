import { CalendarDays, Clock3, DollarSign, Wrench } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Booking } from "@/lib/type"
import { BookingStatusBadge } from "./BookingStatusBadge"
import BookingActions from "@/app/(dashboardGroup)/_components/customerDashboard/BookingActions"

interface BookingCardProps {
  booking: Booking
}

export function BookingCard({ booking }: BookingCardProps) {
  const scheduledDate = new Date(booking.scheduledAt)

  const date = scheduledDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const time = scheduledDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <Card className="overflow-hidden rounded-[24px] border-border bg-white shadow-[0_6px_22px_rgba(0,0,0,0.045)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] dark:bg-zinc-900 dark:shadow-[0_6px_22px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <CardContent className="p-6 sm:p-7">
        {/* Top */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            {/* Service icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[#eee7ff] text-[#7c3aed] dark:bg-[#7c3aed]/20 dark:text-[#a78bfa]">
              <Wrench className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#17151a] dark:text-white">
                {booking.service.serviceName}
              </h3>

              <p className="mt-1 text-sm text-[#837b87] dark:text-zinc-400">
                Customer:{" "}
                <span className="font-medium text-[#4b454e] dark:text-zinc-200">
                  {booking.user!.name}
                </span>
              </p>
            </div>
          </div>

          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Details */}
        <div className="mt-7 grid gap-5 border-t border-[#eeeaf0] pt-6 sm:grid-cols-3 dark:border-zinc-700">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#9a919e] uppercase dark:text-zinc-500">
              Scheduled
            </p>

            <div className="mt-2 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#7c3aed] dark:text-[#a78bfa]" />

              <p className="text-sm font-medium text-[#403a43] dark:text-zinc-200">
                {date}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-wider text-[#9a919e] uppercase dark:text-zinc-500">
              Time
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#7c3aed] dark:text-[#a78bfa]" />

              <p className="text-sm font-medium text-[#403a43] dark:text-zinc-200">
                {time}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-wider text-[#9a919e] uppercase dark:text-zinc-500">
              Price
            </p>

            <div className="mt-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#7c3aed] dark:text-[#a78bfa]" />

              <p className="text-sm font-semibold text-[#17151a] dark:text-white">
                ৳{Number(booking.price).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Customer note */}
        {booking.customerNote && (
          <div className="mt-6 rounded-[16px] bg-[#faf8fc] px-4 py-3 dark:bg-zinc-800/70">
            <p className="text-xs font-medium text-[#9a919e] dark:text-zinc-500">
              CUSTOMER NOTE
            </p>

            <p className="mt-1 text-sm text-[#5c555f] dark:text-zinc-300">
              {booking.customerNote}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <BookingActions
            bookingId={booking.id}
            status={booking.status}
            role="TECHNICIAN"
          />
        </div>
      </CardContent>
    </Card>
  )
}
