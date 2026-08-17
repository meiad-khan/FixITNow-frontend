import { CalendarClock, Clock3, Wallet } from "lucide-react"
import { formatTaka } from "./dashboard-utils"

interface StatsCardsProps {
  pendingCount: number
  upcomingCount: number
  totalEarnings: number
}

const STAT_CONFIG = [
  {
    key: "pending",
    label: "Pending Requests",
    caption: "Waiting on your response",
    icon: Clock3,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    badge: "Action needed",
    blob: "bg-amber-100/60",
  },
  {
    key: "upcoming",
    label: "Upcoming Jobs",
    caption: "Confirmed and scheduled",
    icon: CalendarClock,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    badge: "This week",
    blob: "bg-violet-100/60",
  },
  {
    key: "earnings",
    label: "Total Earnings",
    caption: "From completed jobs",
    icon: Wallet,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badge: "All time",
    blob: "bg-emerald-100/60",
  },
] as const

export function StatsCards({
  pendingCount,
  upcomingCount,
  totalEarnings,
}: StatsCardsProps) {
  const values = {
    pending: pendingCount,
    upcoming: upcomingCount,
    earnings: formatTaka(totalEarnings),
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STAT_CONFIG.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.key}
            className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className={`pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full blur-2xl ${stat.blob}`}
            />
            <div className="relative flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${stat.badgeBg} ${stat.badgeText}`}
              >
                {stat.badge}
              </span>
            </div>

            <p className="relative mt-5 text-sm text-muted-foreground">
              {stat.label}
            </p>
            <p className="relative font-serif text-3xl font-bold tracking-tight">
              {values[stat.key]}
            </p>
            <p className="relative mt-1 text-xs text-muted-foreground">
              {stat.caption}
            </p>
          </div>
        )
      })}
    </div>
  )
}
