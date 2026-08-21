import React from "react"
import UsersTable from "./_components/UsersTable"

export default async function AllUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-background to-violet-500/5 p-6">
        <div className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              👥
            </div>

            <span className="text-sm font-medium text-primary">
              User Management
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            All Users
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customers, technicians, and administrators on FixItNow.
          </p>
        </div>
      </div>

      {/* Users */}
      <UsersTable  searchParams={searchParams} />
    </div>
  )
}
