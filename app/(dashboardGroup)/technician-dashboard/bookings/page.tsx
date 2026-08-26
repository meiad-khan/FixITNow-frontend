import { Booking } from "@/lib/type"
import { getAllBookingsForTechnician } from "../../_actions/technicianDashboard/technician-bookings"
import { BookingStats } from "./_components/BookingStats"
import { BookingList } from "./_components/BookingList"

export default async function MyBookingsPage() {
  const bookingResponse = await getAllBookingsForTechnician()

  const bookings = bookingResponse.data ?? []

  const allBookings = bookings.length

  const paidBookings = bookings.filter(
    (booking: Booking) => booking.status === "PAID"
  ).length

  const acceptedBookings = bookings.filter(
    (booking: Booking) => booking.status === "ACCEPTED"
  ).length

  const inProgressBookings = bookings.filter(
    (booking: Booking) => booking.status === "IN_PROGRESS"
  ).length

  const completedBookings = bookings.filter(
    (booking: Booking) => booking.status === "COMPLETED"
  ).length

  return (
    <main className="min-h-screen bg-[#fdfcfb] dark:bg-[#111111]">
      <div className="mx-auto max-w-375 px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="font-serif text-xl font-medium text-[#7c3aed]">
            Technician Dashboard
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#111111] sm:text-5xl dark:text-white">
            My Bookings
          </h1>

          <p className="mt-3 font-serif text-lg text-[#817682] dark:text-gray-400">
            Manage your service requests and scheduled jobs.
          </p>
        </div>

        <BookingStats
          allBookings={allBookings}
          paidBookings={paidBookings}
          acceptedBookings={acceptedBookings}
          inProgressBookings={inProgressBookings}
          completedBookings={completedBookings}
        />

        {/* Bookings */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="font-serif text-3xl font-bold text-[#17151a] dark:text-white">
              Your Bookings
            </h2>

            <p className="mt-1 font-serif text-base text-[#817682] dark:text-gray-400">
              Review and manage your service bookings.
            </p>
          </div>

          <BookingList bookings={bookings} />
        </section>
      </div>
    </main>
  )
}
