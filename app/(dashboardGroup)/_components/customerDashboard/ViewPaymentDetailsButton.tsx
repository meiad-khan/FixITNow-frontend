"use client"

import { useState } from "react"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ViewPaymentDetailsButtonProps {
  serviceName: string
  technicianName:string
  transactionId: string
  amount: string
  provider: string
  method: string
  status: string
  paidAt: string | null
  createdAt: string
}

export default function ViewPaymentDetailsButton({
  serviceName,
  technicianName,
  transactionId,
  amount,
  provider,
  method,
  status,
  paidAt,
  createdAt,
}: ViewPaymentDetailsButtonProps) {

  const [open, setOpen] = useState(false)
  // console.log("name ", technicianName);

  const formatDate = (value: string | null) => {
    if (!value) return "—"
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <Eye className="mr-2 size-4" />
        View Details
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Service:</span>{" "}
              {serviceName}
            </p>
            <p>
              <span className="text-muted-foreground">Technician:</span>{" "}
              {technicianName || "technician"}
            </p>
            <p>
              <span className="text-muted-foreground">Transaction ID:</span>{" "}
              {transactionId}
            </p>
            <p>
              <span className="text-muted-foreground">Amount:</span> ৳{amount}
            </p>
            <p>
              <span className="text-muted-foreground">Provider:</span>{" "}
              {provider}
            </p>
            <p>
              <span className="text-muted-foreground">Method:</span> {method}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> {status}
            </p>
            <p>
              <span className="text-muted-foreground">Paid At:</span>{" "}
              {formatDate(paidAt)}
            </p>
            <p>
              <span className="text-muted-foreground">Created At:</span>{" "}
              {formatDate(createdAt)}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
