import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Wallet,
  TrendingUp,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Booking, BookingResponse } from "@/lib/type"

const activeStatuses = ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"]


const statConfig = [
  {
    key: "total",
    title: "Total Bookings",
    description: "All time bookings",
    icon: CalendarDays,
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    badgeClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  {
    key: "active",
    title: "Active Bookings",
    description: "Currently active",
    icon: Clock3,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    badgeClass:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    key: "completed",
    title: "Completed",
    description: "Successfully completed",
    icon: CheckCircle2,
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    badgeClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    key: "spent",
    title: "Total Spent",
    description: "Across completed bookings",
    icon: Wallet,
    iconClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    badgeClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
] as const


export default function DashboardStats({
  bookings,
}: {
  bookings: BookingResponse
  }) {
  
  const bookingList = bookings.data

  const totalBooking = bookingList.length

  const activeBooking = bookingList.filter((booking) =>
    activeStatuses.includes(booking.status)
  ).length

  const completedCount = bookingList.filter(
    (booking: Booking) => booking.status === "COMPLETED"
  ).length

  const totalSpent = bookingList.reduce((total, booking) => {
    if (booking.status === "COMPLETED") {
      return total + Number(booking.price)
    }

    return total
  }, 0)

  const stats = statConfig.map((stat) => ({
    ...stat,
    value: {
      total: totalBooking,
      active: activeBooking,
      completed: completedCount,
      spent: `৳${totalSpent.toLocaleString()}`,
    }[stat.key],
  }))

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="relative p-5">
              {/* Decorative background */}
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                {/* Icon */}
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${stat.iconClass}`}
                >
                  <Icon className="size-5" />
                </div>

                {/* Trend */}
                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${stat.badgeClass}`}
                >
                  <TrendingUp className="size-3" />
                  Overview
                </div>
              </div>

              {/* Content */}
              <div className="relative mt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
