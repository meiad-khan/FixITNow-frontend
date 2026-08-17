import Link from "next/link"
import { ArrowUpRight, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDateTime, statusBadgeVariant } from "./dashboard-utils"
import { TechnicianBooking } from "@/lib/technician/type"

interface UpcomingJobsTableProps {
  jobs: TechnicianBooking[]
}

export function UpcomingJobsTable({ jobs }: UpcomingJobsTableProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold">Upcoming Jobs</h2>
          <p className="text-sm text-muted-foreground">
            Your next scheduled visits
          </p>
        </div>
        <Link
          href="/technician-dashboard/bookings"
          className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-50"
        >
          View All Bookings
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No upcoming jobs yet.
        </p>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <Wrench className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <p className="font-medium">{job.service.serviceName}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-13 sm:pl-0">
                <span className="text-sm text-muted-foreground">
                  {formatDateTime(job.scheduledAt)}
                </span>
                <Badge variant={statusBadgeVariant[job.status]}>
                  {job.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
