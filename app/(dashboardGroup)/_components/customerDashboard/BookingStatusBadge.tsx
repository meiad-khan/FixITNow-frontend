import { Badge } from "@/components/ui/badge"

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

const statusConfig: Record<
  BookingStatus,
  {
    label: string
    className: string
  }
> = {
  REQUESTED: {
    label: "Requested",
    className: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
  },

  ACCEPTED: {
    label: "Accepted",
    className: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
  },

  DECLINED: {
    label: "Declined",
    className: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
  },

  PAID: {
    label: "Paid",
    className:
      "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  },

  COMPLETED: {
    label: "Completed",
    className: "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-100",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "border-red-300 bg-red-100 text-red-800 hover:bg-red-100",
  },
}

interface BookingStatusBadgeProps {
  status: BookingStatus
}

export default function BookingStatusBadge({
  status,
}: BookingStatusBadgeProps) {
  const config = statusConfig[status]

  
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 font-medium ${config.className}`}
    >
      {config.label}
    </Badge>
  )
}
