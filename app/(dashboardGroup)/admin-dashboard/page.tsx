import { ClipboardList } from "lucide-react"

import { getDashboardData } from "./_config/dashboardUitls"

import Stats from "./_components/Stats"
import BookingOverview from "./_components/BookingOverview"
import UserOverview from "./_components/UserOverview"
import PlatformSummary from "./_components/PlatformSummary"
import { getAllBookings, getUsersStats } from "../_actions/adminDashboard"

const AdminDashboardPage = async () => {
  const [userStatsResponse, bookingResponse] = await Promise.all([
    getUsersStats(),
    getAllBookings(),
  ])

  const {
    stats,
    bookingStats,
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalAdmins,
    totalBookings,
    activeBookings,
    completedBookings,
    totalRevenue,
  } = getDashboardData(userStatsResponse, bookingResponse)

  return (
    <div className="min-h-full space-y-8 p-6 lg:p-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-violet-500/5 p-6">
        <div className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <span className="text-sm font-medium text-primary">
              Admin Panel
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your FixItNow platform and overall activity.
          </p>
        </div>
      </div>

      {/* STATS */}
      <Stats stats={stats} />

      {/* MIDDLE */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Booking Overview */}
        <BookingOverview
          bookingStats={bookingStats}
          totalBookings={totalBookings}
        />

        {/* User Overview */}
        <UserOverview
          totalUsers={totalUsers}
          totalCustomers={totalCustomers}
          totalTechnicians={totalTechnicians}
          totalAdmins={totalAdmins}
        />
      </div>

      {/* BOTTOM */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Platform Summary */}
        <PlatformSummary
          totalBookings={totalBookings}
          activeBookings={activeBookings}
          completedBookings={completedBookings}
          totalRevenue={totalRevenue}
        />
      </div>
    </div>
  )
}

export default AdminDashboardPage
