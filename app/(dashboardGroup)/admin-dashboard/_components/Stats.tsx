import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface StatsProps {
  stats: Array<{
    title: string
    value: number | string
    description: string
    icon: React.ElementType
    iconClass: string
    badgeClass: string
  }>
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
          >
            <CardContent className="relative p-5">
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${stat.iconClass}`}
                >
                  <Icon className="size-5" />
                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${stat.badgeClass}`}
                >
                  <TrendingUp className="size-3" />
                  Overview
                </div>
              </div>

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
