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
      iconClass: "bg-[#eee7ff] text-[#7c3aed]",
      cardClass: "from-[#ffffff] to-[#f8f5ff]",
    },
    {
      title: "Paid Bookings",
      value: paidBookings,
      icon: CreditCard,
      iconClass: "bg-[#eee7ff] text-[#7c3aed]",
      cardClass: "from-[#ffffff] to-[#faf7ff]",
    },
    {
      title: "Accepted",
      value: acceptedBookings,
      icon: CheckCircle2,
      iconClass: "bg-[#e8f0ff] text-[#2563eb]",
      cardClass: "from-[#ffffff] to-[#f7f9ff]",
    },
    {
      title: "In Progress",
      value: inProgressBookings,
      icon: Clock3,
      iconClass: "bg-[#dcfce7] text-[#059669]",
      cardClass: "from-[#ffffff] to-[#f3fff9]",
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: CalendarCheck,
      iconClass: "bg-[#eeeeee] text-[#666666]",
      cardClass: "from-[#ffffff] to-[#fafafa]",
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className={`rounded-[24px] border-[#e8e4e8] bg-linear-to-br ${stat.cardClass} shadow-[0_8px_25px_rgba(0,0,0,0.06)]`}
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
                <p className="font-serif text-[17px] text-[#776d7b]">
                  {stat.title}
                </p>

                <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#111111]">
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
