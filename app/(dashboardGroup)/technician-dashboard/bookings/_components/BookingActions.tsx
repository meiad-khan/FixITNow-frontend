"use client"

import { Check, CheckCircle2, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingStatus } from "@/lib/type"
import { updateBookingStatus } from "../_actions/updateBookingStatus"
import { toast } from "sonner"
import { useState } from "react"

interface BookingActionsProps {
  bookingId: string
  status: BookingStatus
}

export function BookingActions({ bookingId, status }: BookingActionsProps) {

  const [isPending, setIsPending] = useState(false);

  const handleStatus = async (value: BookingStatus) => {
    try {
      setIsPending(true);
      const result = await updateBookingStatus(bookingId, value)
      if (result.success) {
        toast.success(result.message)
      } else {
        if (result.errorDetails) {
          if (result.errorDetails[0].message) {
            toast.error(result.errorDetails[0].message)
          }
        } else {
          toast.error(result.message)
        }
      }
    } catch (error) {
      console.log("Error during update status by technician ", error);
    } finally {
      setIsPending(false);
    }
  }

  if (status === "REQUESTED") {
    return (
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Button
          disabled={isPending}
          variant="outline"
          className="rounded-full border-[#e7d5d5] bg-white px-5 text-[#b42323] hover:bg-[#fff5f5]"
          onClick={() => {
            handleStatus("DECLINED")
          }}
        >
          <X className="mr-2 h-4 w-4" />
          Decline
        </Button>

        <Button
          disabled={isPending}
          className="rounded-full bg-[#7c3aed] px-6 text-white shadow-sm hover:bg-[#6d28d9]"
          onClick={() => {
            handleStatus("ACCEPTED")
          }}
        >
          <Check className="mr-2 h-4 w-4" />
          Accept Booking
        </Button>
      </div>
    )
  }

  if (status === "PAID") {
    return (
      <Button
        disabled={isPending}
        className="rounded-full bg-[#7c3aed] px-6 text-white shadow-sm hover:bg-[#6d28d9]"
        onClick={() => {
          handleStatus("IN_PROGRESS")
        }}
      >
        <Play className="mr-2 h-4 w-4" />
        Start Job
      </Button>
    )
  }

  if (status === "IN_PROGRESS") {
    return (
      <Button
        disabled={isPending}
        className="rounded-full bg-[#059669] px-6 text-white shadow-sm hover:bg-[#047857]"
        onClick={() => {
          handleStatus("COMPLETED")
        }}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Complete Job
      </Button>
    )
  }

  return null
}
