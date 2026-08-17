"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ViewBookingButtonProps {
  serviceName: string
  technicianName: string
  status: string
  dateLabel: string
  timeLabel: string
  price: string
  customerNote?: string
  |null
}

export default function ViewBookingButton({
  serviceName,
  technicianName,
  status,
  dateLabel,
  timeLabel,
  price,
  customerNote,
}: ViewBookingButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="group" onClick={() => setOpen(true)}>
        View Booking
        <ArrowUpRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{serviceName}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Technician:</span>{" "}
              {technicianName}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> {status}
            </p>
            <p>
              <span className="text-muted-foreground">Date:</span> {dateLabel}
            </p>
            <p>
              <span className="text-muted-foreground">Time:</span> {timeLabel}
            </p>
            <p>
              <span className="text-muted-foreground">Price:</span> ৳{price}
            </p>
            <p>
              <span className="text-muted-foreground">Note:</span>{" "}
              {customerNote}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
