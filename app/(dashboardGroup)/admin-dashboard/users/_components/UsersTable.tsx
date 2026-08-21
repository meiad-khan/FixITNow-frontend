import React, { Suspense } from "react"
import {
  Search,
  Users,
  UserCheck,
  Wrench,
  ShieldCheck,
  Ban,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import SearchBar from "./SearchBar"
import FilterByRole from "./FilterByRole"
import Pagination from "./Pagination"
import UserStats from "./UserStats"
import { getUsersStats } from "@/app/(dashboardGroup)/_actions/adminDashboard"
import TableBodySkeleton from "./TableBodySkeleton"
import UsersTableContent from "./UsersTableContent"


export default async function UsersTable({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  const query = await searchParams
  const statsResponse = await getUsersStats();
  // console.log("stat response ", statsResponse);
  const stats = statsResponse.data.stats ?? {};

  return (
    <div className="space-y-6">
      {/* Small Statistics */}
      <UserStats stats={stats} />

      {/* Main Table */}
      <Card className="overflow-hidden border-muted/60">
        <CardHeader className="border-b bg-linear-to-r from-primary/5 via-transparent to-violet-500/5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage all registered users on the platform.
              </p>
            </div>

            {/* <DynamicSearchedResultCount/>
             */}
            {/* <div className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              0 users found
            </div> */}
          </div>
        </CardHeader>

        <CardContent className="p-5">
          {/* Search + Filter */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <SearchBar />

            <FilterByRole />
          </div>

          {/* Table */}
          <div className="min-h-[850px] overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    User
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Phone
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Role
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Joined
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <Suspense fallback={<TableBodySkeleton />}>
                <UsersTableContent query={query} />
              </Suspense>
            </table>
          </div>
          {/* Pagination */}
          <Pagination />
        </CardContent>
      </Card>
    </div>
  )
}