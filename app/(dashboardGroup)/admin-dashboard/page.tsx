import React from "react"

import Stats from "./_components/Stats"
import BookingOverview from "./_components/BookingOverview"
import UserOverview from "./_components/UserOverview"
import PlatformSummary from "./_components/PlatformSummary"
import { ClipboardList } from "lucide-react"

const AdminDashboardPage = async () => {
 
  return (
    <div className="min-h-full space-y-8 p-6 lg:p-8">
      {/*  HEADER  */}
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

      {/* Sats */}
      <Stats />

      {/*  MIDDLE  */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Booking Overview */}
        <BookingOverview />

        {/* User Overview */}
        <UserOverview />
      </div>

      {/*  BOTTOM  */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        {/* <RecentUsers /> */}

        {/* Platform Summary */}
        <PlatformSummary />
      </div>
    </div>
  )
}

export default AdminDashboardPage
