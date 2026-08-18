import { Booking } from "@/lib/type"
import { BookingCard } from "./BookingCard"

interface BookingListProps {
  bookings: Booking[]
}

export function BookingList({ bookings }: BookingListProps) {
  if (!bookings.length) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center">
        <h3 className="text-lg font-semibold">No bookings found</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          You do not have any bookings yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}
