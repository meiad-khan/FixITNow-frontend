"use client"

import { useState } from "react"
import { CalendarDays, Clock3, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export type Service = {
  id: string
  serviceName: string
  basePrice: string
}

type TechnicianBookingProps = {
  services: Service[]
  availability: Record<string, string[]>
}

export default function TechnicianBooking({ services, availability }: TechnicianBookingProps) {
  const [selectedService, setSelectedService] = useState(services[0]?.id ?? "")

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const selectedServiceData = services.find(
    (service) => service.id === selectedService
  )

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

  return (
    <div className="space-y-6">
      {/* =====================================================
          SERVICE
      ====================================================== */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Select Service</label>

        <RadioGroup
          value={selectedService}
          onValueChange={setSelectedService}
          className="space-y-2"
        >
          {services.map((service) => (
            <label
              key={service.id}
              htmlFor={service.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <RadioGroupItem value={service.id} id={service.id} />

                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="size-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">{service.serviceName}</p>

                  <p className="text-xs text-muted-foreground">
                    Professional service
                  </p>
                </div>
              </div>

              <span className="shrink-0 font-semibold">
                ৳{service.basePrice}
              </span>
            </label>
          ))}
        </RadioGroup>
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
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
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
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {selectedDate &&
              getAvailableTimeSlots(selectedDate).map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant="outline"
                  className="h-10"
                >
                  {time}
                </Button>
              ))}
          </div>
        )}
      </div>

      {/* =====================================================
          NOTE
      ====================================================== */}
      <div className="space-y-2">
        <label htmlFor="customer-note" className="text-sm font-medium">
          Note for Technician
        </label>

        <Textarea
          id="customer-note"
          placeholder="Describe your problem or add special instructions..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* =====================================================
          SUMMARY
      ====================================================== */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              {selectedServiceData?.serviceName ?? "No service selected"}
            </p>

            <p className="text-xs text-muted-foreground">
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : "No date selected"}
            </p>
          </div>

          <span className="font-semibold">
            {selectedServiceData ? `৳${selectedServiceData.basePrice}` : "—"}
          </span>
        </div>
      </div>

      <Button size="lg" className="w-full">
        Confirm Booking
      </Button>
    </div>
  )
}
