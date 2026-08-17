import { getMyBookings } from "../../_actions/customerDashboard"
import DashboardHeader from "./customerDashboardOverview/DashboardHeader"
import DashboardStats from "./customerDashboardOverview/DashboardStats"
import QuickActions from "./customerDashboardOverview/QuickActions"
import RecentBookings from "./customerDashboardOverview/RecentBookings"
import UpcomingBooking from "./customerDashboardOverview/UpcomingBooking"

export default async function DashboardOverview() {
  const bookings = await getMyBookings()

  // console.log("booking is ", bookings)

  return (
    <div className="space-y-8 md:p-10 ">
      <DashboardHeader />

      <DashboardStats bookings={bookings} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <UpcomingBooking bookings={bookings} />
        <QuickActions />
      </div>

      <RecentBookings bookings={bookings}/>
    </div>
  )
}
