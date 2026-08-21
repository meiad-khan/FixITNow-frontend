import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, CircleDollarSign, ClipboardList, TrendingUp } from 'lucide-react'
import React from 'react'
import { activeBookings, completedBookings, totalBookings, totalRevenue } from '../_config/dashboardUitls'

export default function PlatformSummary() {
  return (
    <Card className="overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b bg-linear-to-br from-pink-500/5 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400">
            <CircleDollarSign className="size-4" />
          </div>
          Platform Summary
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Overall platform statistics
        </p>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3 p-5">
        <div className="group rounded-xl border bg-blue-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md dark:bg-blue-950/10 dark:hover:border-blue-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Total Bookings
            </p>

            <ClipboardList className="size-4 text-blue-500 transition-transform group-hover:scale-110" />
          </div>

          <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalBookings}
          </p>
        </div>

        <div className="group rounded-xl border bg-emerald-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md dark:bg-emerald-950/10 dark:hover:border-emerald-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Active Bookings
            </p>

            <TrendingUp className="size-4 text-emerald-500 transition-transform group-hover:scale-110" />
          </div>

          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {activeBookings}
          </p>
        </div>

        <div className="group rounded-xl border bg-violet-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50 hover:shadow-md dark:bg-violet-950/10 dark:hover:border-violet-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Completed
            </p>

            <CheckCircle2 className="size-4 text-violet-500 transition-transform group-hover:scale-110" />
          </div>

          <p className="mt-2 text-2xl font-bold text-violet-600 dark:text-violet-400">
            {completedBookings}
          </p>
        </div>

        <div className="group rounded-xl border bg-pink-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50 hover:shadow-md dark:bg-pink-950/10 dark:hover:border-pink-900">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Revenue</p>

            <CircleDollarSign className="size-4 text-pink-500 transition-transform group-hover:scale-110" />
          </div>

          <p className="mt-2 text-2xl font-bold text-pink-600 dark:text-pink-400">
            ৳{totalRevenue.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
