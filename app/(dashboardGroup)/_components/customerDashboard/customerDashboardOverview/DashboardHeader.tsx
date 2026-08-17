import { CalendarDays, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProfile } from "@/service/getProfile"

export default async function DashboardHeader() {

  const user = await getProfile();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      {/* Welcome */}
      <div>
        <p className="mb-1 text-sm font-medium text-primary">
          Customer Dashboard
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
         { `Welcome back, ${user.data.name}! 👋`}
        </h1>

        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your service bookings.
        </p>
      </div>

      {/* Dashboard period */}
      <Button variant="outline" className="w-fit gap-2 rounded-xl shadow-sm">
        <CalendarDays className="size-4 text-muted-foreground" />

        <span>August 2026</span>

        <ChevronDown className="size-4 text-muted-foreground" />
      </Button>
    </div>
  )
}
