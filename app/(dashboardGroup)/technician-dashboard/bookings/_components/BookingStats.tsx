import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  CreditCard,
  Layers3,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface BookingStatsProps {
  allBookings: number
  paidBookings: number
  acceptedBookings: number
  inProgressBookings: number
  completedBookings: number
}

export function BookingStats({
  allBookings,
  paidBookings,
  acceptedBookings,
  inProgressBookings,
  completedBookings,
}: BookingStatsProps) {

 const stats = [
   {
     title: "All Bookings",
     value: allBookings,
     icon: Layers3,
     iconClass:
       "bg-[#eee7ff] text-[#7c3aed] dark:bg-[#7c3aed]/20 dark:text-[#a78bfa]",
     cardClass: "from-white to-[#f8f5ff] dark:from-zinc-900 dark:to-zinc-950",
   },
   {
     title: "Paid Bookings",
     value: paidBookings,
     icon: CreditCard,
     iconClass:
       "bg-[#eee7ff] text-[#7c3aed] dark:bg-[#7c3aed]/20 dark:text-[#a78bfa]",
     cardClass: "from-white to-[#faf7ff] dark:from-zinc-900 dark:to-zinc-950",
   },
   {
     title: "Accepted",
     value: acceptedBookings,
     icon: CheckCircle2,
     iconClass:
       "bg-[#e8f0ff] text-[#2563eb] dark:bg-[#2563eb]/20 dark:text-[#60a5fa]",
     cardClass: "from-white to-[#f7f9ff] dark:from-zinc-900 dark:to-zinc-950",
   },
   {
     title: "In Progress",
     value: inProgressBookings,
     icon: Clock3,
     iconClass:
       "bg-[#dcfce7] text-[#059669] dark:bg-[#059669]/20 dark:text-[#34d399]",
     cardClass: "from-white to-[#f3fff9] dark:from-zinc-900 dark:to-zinc-950",
   },
   {
     title: "Completed",
     value: completedBookings,
     icon: CalendarCheck,
     iconClass:
       "bg-[#eeeeee] text-[#666666] dark:bg-zinc-800 dark:text-zinc-300",
     cardClass: "from-white to-[#fafafa] dark:from-zinc-900 dark:to-zinc-950",
   },
 ]
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`rounded-[24px] border-border bg-linear-to-br ${stat.cardClass} shadow-[0_8px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.25)]`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-[18px] ${stat.iconClass}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-7">
                <p className="font-serif text-[17px] text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
