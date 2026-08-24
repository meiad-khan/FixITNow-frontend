"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, CheckCircle2, Clock3, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { createBooking } from "../../_actions/technicianActions/bookingActions"
import Link from "next/link"

type ServiceBookingProps = {
  serviceId: string
  serviceName: string
  basePrice: string
  availability: Record<string, string[]>
  technicianName: string
}

export default function ServiceBooking({
  serviceId,
  serviceName,
  basePrice,
  availability,
  technicianName,
}: ServiceBookingProps) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const [selectedTime, setSelectedTime] = useState("")

  const [customerNote, setCustomerNote] = useState("")

  const [error, setError] = useState("")

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)

  /* ============================================================
      GET AVAILABLE TIME SLOTS
  ============================================================ */

  const getAvailableTimeSlots = (date: Date) => {
    const day = date
      .toLocaleDateString("en-US", {
        weekday: "long",
      })
      .toLowerCase()

    const availabilityForDay = availability[day]

    if (!availabilityForDay) {
      return []
    }

    const slots: string[] = []

    availabilityForDay.forEach((range) => {
      const [start, end] = range.split("-")

      const [startHour, startMinute] = start.split(":").map(Number)

      const [endHour, endMinute] = end.split(":").map(Number)

      let currentMinutes = startHour * 60 + startMinute

      const endMinutes = endHour * 60 + endMinute

      while (currentMinutes < endMinutes) {
        const hour = Math.floor(currentMinutes / 60)

        const minute = currentMinutes % 60

        const formattedHour = hour % 12 || 12

        const period = hour >= 12 ? "PM" : "AM"

        slots.push(
          `${String(formattedHour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )} ${period}`
        )

        currentMinutes += 60
      }
    })

    return slots
  }

  /* ============================================================
      CREATE ISO DATETIME
  ============================================================ */

  const createScheduledAt = (date: Date, time: string) => {
    const [timeValue, period] = time.split(" ")

    let [hour, minute] = timeValue.split(":").map(Number)

    if (period === "PM" && hour !== 12) {
      hour += 12
    }

    if (period === "AM" && hour === 12) {
      hour = 0
    }

    const scheduledDate = new Date(date)

    scheduledDate.setHours(hour, minute, 0, 0)

    return scheduledDate.toISOString()
  }

  /* ============================================================
      CONFIRM BOOKING
  ============================================================ */

  const handleConfirmBooking = () => {
    setError("")

    if (!selectedDate) {
      setError("Please select a booking date.")
      return
    }

    if (!selectedTime) {
      setError("Please select an available time.")
      return
    }

    const scheduledAt = createScheduledAt(selectedDate, selectedTime)

    startTransition(async () => {
      const result = await createBooking({
        serviceId,
        scheduledAt,
        customerNote: customerNote.trim(),
      })

      /* ========================================================
          NOT LOGGED IN
      ======================================================== */

      if (!result.success) {
        if (result.statusCode === 401) {
          const redirectTo = `/service/${serviceId}`

          router.push(`/login?redirectTo=${encodeURIComponent(redirectTo)}`)

          return
        }

        setError(result.message || "Failed to create booking.")

        return
      }

      /* ========================================================
          SUCCESS
      ======================================================== */

      setIsSuccessDialogOpen(true)
    })
  }

  const availableTimeSlots = selectedDate
    ? getAvailableTimeSlots(selectedDate)
    : []

  return (
    <>
      <div className="space-y-6">
        {/* =====================================================
            FIXED SERVICE
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Selected Service</label>

          <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Wrench className="size-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="font-medium">{serviceName}</p>

                <p className="text-xs text-muted-foreground">
                  Professional service
                </p>
              </div>
            </div>

            <span className="shrink-0 font-semibold">৳{basePrice}</span>
          </div>
        </div>

        {/* =====================================================
            DATE
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-11 w-full justify-start font-normal"
              >
                <CalendarDays className="mr-2 size-4" />

                {selectedDate ? (
                  selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                ) : (
                  <span className="text-muted-foreground">Choose a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedTime("")
                  setError("")
                }}
                disabled={(date) => {
                  const today = new Date()

                  today.setHours(0, 0, 0, 0)

                  return date < today
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* =====================================================
            TIME
        ====================================================== */}

        <div className="space-y-2">
          <label className="text-sm font-medium">Available Time</label>

          {!selectedDate ? (
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Clock3 className="mx-auto mb-2 size-5 text-muted-foreground" />

              <p className="text-sm font-medium">Select a date first</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Available time slots will appear after selecting a date.
              </p>
            </div>
          ) : availableTimeSlots.length === 0 ? (
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Clock3 className="mx-auto mb-2 size-5 text-muted-foreground" />

              <p className="text-sm font-medium">No availability</p>

              <p className="mt-1 text-xs text-muted-foreground">
                The technician is not available on this day.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-10"
                  onClick={() => {
                    setSelectedTime(time)
                    setError("")
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            CUSTOMER NOTE
        ====================================================== */}

        <div className="space-y-2">
          <label htmlFor="customer-note" className="text-sm font-medium">
            Note for Technician
          </label>

          <Textarea
            id="customer-note"
            value={customerNote}
            onChange={(event) => setCustomerNote(event.target.value)}
            placeholder="Describe your problem or add special instructions..."
            className="min-h-24 resize-none"
          />
        </div>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">{serviceName}</p>

              <p className="text-xs text-muted-foreground">
                {selectedDate && selectedTime
                  ? `${selectedDate.toLocaleDateString()} at ${selectedTime}`
                  : "No date and time selected"}
              </p>
            </div>

            <span className="font-semibold">৳{basePrice}</span>
          </div>
        </div>

        {/* =====================================================
            CONFIRM BOOKING
        ====================================================== */}

        <Button
          size="lg"
          className="w-full"
          onClick={handleConfirmBooking}
          disabled={isPending || !selectedDate || !selectedTime}
        >
          {isPending ? "Creating Booking..." : "Confirm Booking"}
        </Button>
      </div>

      {/* =======================================================
          SUCCESS DIALOG
      ======================================================== */}

      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="size-7 text-green-600" />
            </div>

            <DialogTitle>Booking Created Successfully</DialogTitle>

            <DialogDescription className="leading-6">
              Your booking has been created successfully. Please wait until{" "}
              <span className="font-medium text-foreground">
                {technicianName}
              </span>{" "}
              accepts your booking before making payment.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsSuccessDialogOpen(false)}
            >
              Close
            </Button>

            <Button asChild>
              <Link href="/dashboard/bookings">Go to My Bookings</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
