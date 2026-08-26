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
import { cancelBooking, makePayment, makeReview } from "../../_actions/customerDashboard"
import { toast } from "sonner"
import { updateBookingStatus } from "../../_actions/technicianDashboard/update-booking-status"

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
  const [isPending, setIsPending] = useState(false);

  const [cancelOpen, setCancelOpen] = useState(false)

  const canCustomerCancel = ["REQUESTED", "ACCEPTED", "PAID"].includes(status)

   const handlePay = async() => {
     try {
       setIsPending(true);
      const result = await makePayment(bookingId);
      if (result.success) {
        router.push(result.data.paymentUrl)
      } else {
        toast.error(result.message || "Payment failed")
      }
    } catch (error) {
      console.log("Payment error ", error);
      toast.error("Something went wrong while connecting to the payment gateway");
     } finally {
       setIsPending(false);
    }
  }


  const handleSubmitReview = async() => {
    // console.log("Submit review:", { bookingId, rating, reviewText: comment })
    try {
      setIsPending(true);
      const payload = { bookingId, rating, reviewText: comment }
      const result = await makeReview(payload)
      if (result.success) {
        toast.success("Review submitted successfully")
      } else {
        toast.error("Something went wrong. Try again")
      }
    } catch (error) {
      console.log("Review submission error ", error);
      toast.error(
        "Something went wrong while connecting to the server"
      )
    } finally {
      setReviewOpen(false)
      setRating(0)
      setComment("")
      setIsPending(false);
    }
    
  }


  const handleConfirmCancel = async() => {
    // console.log("Cancel booking:", bookingId)
    try {
      setIsPending(true);
      const result = await cancelBooking(bookingId)
      if (result.success) {
        toast.success(result.message || "Booking cancelled successfully")
      } else {
        toast.error(result.message || "Something went wrong")
      }
    } catch (error) {
      console.log("Error when cancel booking ", error);
      toast.error(
        "Something went wrong while connecting to the server"
      )
    } finally {
      setCancelOpen(false);
      setIsPending(false);
    }
  }


  const handleAction = async(value:BookingStatus) => {
    console.log(`Booking action: ${value}`)
     try {
          setIsPending(true)
          const result = await updateBookingStatus(bookingId, value)
          if (result.success) {
            if (value === "ACCEPTED") {
              toast.success("Booking accepted")
            } else if (value === "DECLINED") {
              toast.success("Booking declined")
            } else if (value === "COMPLETED") {
              toast.success("Booking completed successfully")
            } else if (value === "IN_PROGRESS") {
              toast.success("Booking is on progress")
            }
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
          console.log("Error during update status by technician ", error)
        } finally {
          setIsPending(false)
        }

  }

 
  if (role === "CUSTOMER") {
    return (
      <>
        <div className="flex flex-wrap items-center gap-2">
          {status === "ACCEPTED" && (
            <Button disabled={isPending} size="sm" onClick={handlePay}>
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
              <Button
                onClick={handleSubmitReview}
                disabled={rating === 0 || isPending}
              >
                {isPending ? "Submitting..." : "Submit Review"}
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
                disabled={isPending}
                onClick={handleConfirmCancel}
                className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
              >
                {isPending ? "Cancelling..." : "Yes, Cancel"}
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
          <Button size="sm" onClick={() => handleAction("ACCEPTED")}>
            <Check className="mr-2 size-4" />
            {isPending ? "Accepting..." : "Accept"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("DECLINED")}
            className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="mr-2 size-4" />
            {isPending ? "Declining..." : "Decline"}
          </Button>
        </div>
      )

    case "PAID":
      return (
        <Button size="sm" onClick={() => handleAction("IN_PROGRESS")}>
          <CirclePlay className="mr-2 size-4" />
          {isPending ? "Starting..." : "Start Job"}
        </Button>
      )

    case "IN_PROGRESS":
      return (
        <Button size="sm" onClick={() => handleAction("COMPLETED")}>
          <CircleCheck className="mr-2 size-4" />
          {isPending ? "Completing..." : "Complete Job"}
        </Button>
      )

    default:
      return null
  }
}
