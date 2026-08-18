import React from "react"
import { getAllBookingsForTechnician } from "../_actions/technicianDashboard/technician-bookings"
import { getProfile } from "@/service/getProfile"
import { StatsCards } from "../_components/technicianDashboard/StatsCards"
import { UpcomingJobsTable } from "../_components/technicianDashboard/UpcomingJobsTable"
import { PendingRequests } from "../_components/technicianDashboard/PendingRequests"
import { QuickActions } from "../_components/technicianDashboard/QuickActions"
import { getDashboardData } from "../_components/technicianDashboard/dashboard-utils"
import { redirect } from "next/navigation"

const TechnicianDashboardPage = async () => {

  const bookings = await getAllBookingsForTechnician()
  if (bookings.message === "Technician not found") {
    redirect("/be-a-technician");
  }
    const technician = await getProfile()

  const { stats, nextThreeJobs, latestRequests } = getDashboardData(bookings.data)

  // console.log("booking data is ", bookings.data);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-600">
            Technician Dashboard
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight">
            Good morning, {technician.data.name.trim() || "Technician"} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here&#39;s what&#39;s on your schedule today.
          </p>
        </div>
      </div>

      <StatsCards
        pendingCount={stats.pendingCount}
        upcomingCount={stats.upcomingCount}
        totalEarnings={stats.totalEarnings}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <UpcomingJobsTable jobs={nextThreeJobs} />
          <PendingRequests requests={latestRequests} />
        </div>
        <QuickActions />
      </div>
    </div>
  )
}

export default TechnicianDashboardPage
