import Link from "next/link"
import { ArrowUpRight, CalendarCog, ListChecks, Zap } from "lucide-react"

const ACTIONS = [
  {
    href: "/technician-dashboard/availability",
    title: "Manage Availability",
    subtitle: "Set the hours you can take jobs",
    icon: CalendarCog,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    href: "/technician-dashboard/bookings",
    title: "View Bookings",
    subtitle: "See all your past and upcoming jobs",
    icon: ListChecks,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
]

export function QuickActions() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <Zap className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Jump to what you need</p>
        </div>
      </div>

      <div className="space-y-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.iconBg}`}
                >
                  <Icon className={`h-4 w-4 ${action.iconColor}`} />
                </div>
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {action.subtitle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
