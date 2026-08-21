import { Card, CardContent } from '@/components/ui/card'
import { IUser } from '@/lib/type'
import { ShieldCheck, UserCheck, Users, Wrench } from 'lucide-react'
import React from 'react'


type UserStatsProp = {
  totalUsers: number
  totalCustomer: number
  totalTechnician: number
  totalAdmin: number
}

export default function UserStats({stats}:{stats:UserStatsProp}) {
  
  const {totalUsers, totalAdmin,totalCustomer,totalTechnician } = stats;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="relative p-5">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-blue-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>

              <p className="mt-1 text-2xl font-bold">{totalUsers}</p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Users className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="relative p-5">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-blue-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customers
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalCustomer}
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <UserCheck className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="relative p-5">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-orange-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Technicians
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600 dark:text-orange-400">
                {totalTechnician}
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <Wrench className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group overflow-hidden border-muted/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="relative p-5">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-violet-500/5 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Administrators
              </p>

              <p className="mt-1 text-2xl font-bold text-violet-600 dark:text-violet-400">
                {totalAdmin}
              </p>
            </div>

            <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
              <ShieldCheck className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
