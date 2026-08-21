"use client"
import { ArrowUpRight, CalendarDays, CreditCard, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const actions = [
  {
    title: "Find a Technician",
    description: "Book a new service",
    icon: Search,
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    hoverClass:
      "hover:border-violet-300 hover:bg-violet-50/60 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5",
    redirectTo: "/technician",
  },
  {
    title: "My Bookings",
    description: "View all your bookings",
    icon: CalendarDays,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    hoverClass:
      "hover:border-amber-300 hover:bg-amber-50/60 dark:hover:border-amber-500/30 dark:hover:bg-amber-500/5",
    redirectTo: "/dashboard/bookings",
  },
  {
    title: "Payment History",
    description: "View your transactions",
    icon: CreditCard,
    iconClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    hoverClass:
      "hover:border-blue-300 hover:bg-blue-50/60 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5",
    redirectTo: "/dashboard/payments",
  },
]

export default function QuickActions() {
  const router = useRouter();
  return (
    <Card className="border-muted/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="size-5" />
          </div>

          <div>
            <CardTitle className="text-base">Quick Actions</CardTitle>

            <p className="text-xs text-muted-foreground">
              Quickly access common actions
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Button
              key={action.title}
              variant="outline"
              className={`group h-auto w-full justify-between rounded-xl p-3.5 transition-all duration-200 cursor-pointer ${action.hoverClass}`}
              onClick={()=>router.push(action.redirectTo)}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${action.iconClass}`}
                >
                  <Icon className="size-4.5" />
                </span>

                <span className="text-left">
                  <span className="block font-semibold">{action.title}</span>

                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    {action.description}
                  </span>
                </span>
              </span>

              <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}
