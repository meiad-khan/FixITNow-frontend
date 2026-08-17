"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Check, X, Clock3 } from "lucide-react"
import { formatDateTime } from "./dashboard-utils"
import { updateBookingStatus } from "../../_actions/update-booking-status"
import { TechnicianBooking } from "@/lib/technician/type"

interface PendingRequestsProps {
  requests: TechnicianBooking[]
}

export function PendingRequests({ requests }: PendingRequestsProps) {
  const [isPending, startTransition] = useTransition()
  const [actingOnId, setActingOnId] = useState<string | null>(null)
  const router = useRouter()

  function handleDecision(bookingId: string, status: "ACCEPTED" | "DECLINED") {
    setActingOnId(bookingId)
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, status)
        toast.success(
          status === "ACCEPTED" ? "Request accepted" : "Request declined"
        )
        router.refresh()
      } catch {
        toast.error("Something went wrong. Please try again.")
      } finally {
        setActingOnId(null)
      }
    })
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="font-serif text-lg font-semibold">Pending Requests</h2>
        <p className="text-sm text-muted-foreground">
          New bookings waiting for your reply
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No pending requests right now.
        </p>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const busy = isPending && actingOnId === req.id
            return (
              <div
                key={req.id}
                className="flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Clock3 className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {req.service.serviceName}{" "}
                      <span className="font-normal text-muted-foreground">
                        • {req.user.name}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateTime(req.scheduledAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={busy}
                    onClick={() => handleDecision(req.id, "ACCEPTED")}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                    Accept
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => handleDecision(req.id, "DECLINED")}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                    Decline
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
