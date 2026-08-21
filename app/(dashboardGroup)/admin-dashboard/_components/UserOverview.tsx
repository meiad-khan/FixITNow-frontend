import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserCheck, Users, Wrench } from 'lucide-react'
import React from 'react'
import { totalAdmins, totalCustomers, totalTechnicians, totalUsers } from '../_config/dashboardUitls'

export default function UserOverview() {
  return (
    <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="border-b bg-linear-to-br from-violet-500/5 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
            <Users className="size-4" />
          </div>
          User Overview
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Platform user distribution
        </p>
      </CardHeader>

      <CardContent className="space-y-3 p-5">
        {/* Total */}

        <div className="group/user flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm dark:hover:border-blue-900 dark:hover:bg-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Users className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">Total Users</p>
              <p className="text-xs text-muted-foreground">
                All registered accounts
              </p>
            </div>
          </div>

          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {totalUsers}
          </p>
        </div>

        {/* Customers */}

        <div className="group/user flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-sm dark:hover:border-violet-900 dark:hover:bg-violet-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
              <UserCheck className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">Customers</p>
              <p className="text-xs text-muted-foreground">
                Users requesting services
              </p>
            </div>
          </div>

          <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
            {totalCustomers}
          </p>
        </div>

        {/* Technicians */}

        <div className="group/user flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm dark:hover:border-orange-900 dark:hover:bg-orange-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <Wrench className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">Technicians</p>
              <p className="text-xs text-muted-foreground">Service providers</p>
            </div>
          </div>

          <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
            {totalTechnicians}
          </p>
        </div>

        {/* Admins */}

        <div className="group/user flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-sm dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Users className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">Administrators</p>
              <p className="text-xs text-muted-foreground">
                Platform administrators
              </p>
            </div>
          </div>

          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {totalAdmins}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
