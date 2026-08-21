"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Check,
  CircleCheck,
  CirclePlay,
  CreditCard,
  MessageSquareText,
  Star,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { BookingStatus } from "./BookingStatusBadge"
import { makePayment } from "../../_actions/customerDashboard"
import { toast } from "sonner"

type UserRole = "CUSTOMER" | "TECHNICIAN"

interface BookingActionsProps {
  bookingId: string
  status: BookingStatus
  role: UserRole
}

export default function BookingActions({
  bookingId,
  status,
  role,
}: BookingActionsProps) {

  const router = useRouter()

  const [reviewOpen, setReviewOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const [cancelOpen, setCancelOpen] = useState(false)

  const canCustomerCancel = ["REQUESTED", "ACCEPTED", "PAID"].includes(status)

   const handlePay = async() => {
    try {
      const result = await makePayment(bookingId);
      if (result.success) {
        router.push(result.data.paymentUrl);
        toast.success("Payment successfull")
      } else {
        toast.error("Payment failed")
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleSubmitReview = () => {
    console.log("Submit review:", { bookingId, rating, comment })
    setReviewOpen(false)
    setRating(0)
    setComment("")
  }


  const handleConfirmCancel = () => {
    // console.log("Cancel booking:", bookingId)
    setCancelOpen(false)
  }


  const handleAction = (action: string) => {
    console.log(`Booking action: ${action}`)
  }

 
  if (role === "CUSTOMER") {
    return (
      <>
        <div className="flex flex-wrap items-center gap-2">
          {status === "ACCEPTED" && (
            <Button size="sm" onClick={handlePay}>
              <CreditCard className="mr-2 size-4" />
              Pay Now
            </Button>
          )}

          {status === "COMPLETED" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setReviewOpen(true)}
            >
              <MessageSquareText className="mr-2 size-4" />
              Leave Review
            </Button>
          )}

          {canCustomerCancel && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCancelOpen(true)}
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>
          )}

          {status === "IN_PROGRESS" && (
            <p className="text-xs text-muted-foreground">
              Your service is currently in progress.
            </p>
          )}
        </div>

        {/* Leave a Review modal */}
        <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                  >
                    <Star
                      className={`size-6 ${
                        value <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReview} disabled={rating === 0}>
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel confirmation */}
        <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will cancel your booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmCancel}
                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              >
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }


  /*  TECHNICIAN */

  switch (status) {
    case "REQUESTED":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={() => handleAction("accept")}>
            <Check className="mr-2 size-4" />
            Accept
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("decline")}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="mr-2 size-4" />
            Decline
          </Button>
        </div>
      )

    case "PAID":
      return (
        <Button size="sm" onClick={() => handleAction("start-job")}>
          <CirclePlay className="mr-2 size-4" />
          Start Job
        </Button>
      )

    case "IN_PROGRESS":
      return (
        <Button size="sm" onClick={() => handleAction("complete-job")}>
          <CircleCheck className="mr-2 size-4" />
          Complete Job
        </Button>
      )

    default:
      return null
  }
}
