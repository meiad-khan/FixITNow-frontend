"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import TechnicianBooking, { Service } from "./TechnicianBooking"

type CreateBookingModalProps = {
  services: Service[]
  availability: Record<string, string[]>
  technicianName: string
  technicianId:string
}

export default function CreateBookingModal({
  services,
  availability,
  technicianName,
  technicianId,
}: CreateBookingModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Book Now Button */}
      <Button
        size="lg"
        className="w-full md:w-auto"
        onClick={() => setOpen(true)}
      >
        <CalendarDays className="mr-2 size-4" />
        Book Now
      </Button>

      {/* Booking Modal */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" />
            Book {technicianName}
          </DialogTitle>
        </DialogHeader>

        <TechnicianBooking
          services={services}
          availability={availability}
          technicianName={technicianName}
          redirectTo={`/technician/${technicianId}`}
        />
      </DialogContent>
    </Dialog>
  )
}
