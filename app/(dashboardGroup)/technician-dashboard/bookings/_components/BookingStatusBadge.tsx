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
    label: "REQUESTED",
    className:
      "border-transparent bg-[#fff3d6] text-[#c56a00] hover:bg-[#fff3d6]",
  },

  ACCEPTED: {
    label: "ACCEPTED",
    className:
      "border-transparent bg-[#eee7ff] text-[#6d28d9] hover:bg-[#eee7ff]",
  },

  DECLINED: {
    label: "DECLINED",
    className:
      "border-transparent bg-[#ffe4e4] text-[#c62828] hover:bg-[#ffe4e4]",
  },

  PAID: {
    label: "PAID",
    className:
      "border-transparent bg-[#eee7ff] text-[#7c3aed] hover:bg-[#eee7ff]",
  },

  IN_PROGRESS: {
    label: "IN PROGRESS",
    className:
      "border-transparent bg-[#dcfce7] text-[#16803c] hover:bg-[#dcfce7]",
  },

  COMPLETED: {
    label: "COMPLETED",
    className:
      "border-transparent bg-[#eeeeee] text-[#555555] hover:bg-[#eeeeee]",
  },

  CANCELLED: {
    label: "CANCELLED",
    className:
      "border-transparent bg-[#f5dddd] text-[#8b1e1e] hover:bg-[#f5dddd]",
  },
}

interface BookingStatusBadgeProps {
  status: BookingStatus
}

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      className={`rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wide ${config.className}`}
    >
      {config.label}
    </Badge>
  )
}
