import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CreditCard,
  Receipt,
  ShieldCheck,
} from "lucide-react"

import { getPaymentDetails } from "../../_actions/customerDashboard"
import PayAgainButton from "./_components/PayAgain"

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams

  const tranId = typeof params.tran_id === "string" ? params.tran_id : undefined

  
  if (!tranId) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border bg-background p-8 text-center shadow-sm md:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Payment Failed
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground md:text-base">
              We could not complete your payment. No payment has been recorded
              for this transaction.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard/bookings"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                View My Bookings
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const paymentResponse = await getPaymentDetails(tranId)

  
  if (!paymentResponse?.success || !paymentResponse?.data) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border bg-background p-8 text-center shadow-sm md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Receipt className="h-8 w-8 text-red-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              Payment Failed
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We could not retrieve the payment details right now. Please check
              your booking before trying again.
            </p>

            <Link
              href="/dashboard/bookings"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              View My Bookings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const payment = paymentResponse.data

  const amount = Number(payment.amount).toLocaleString("en-BD")

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-11 w-11 text-red-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Payment Failed
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
            We could not complete your payment. Please try again or use a
            different payment method.
          </p>
        </section>

        {/* Amount */}
        <section className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Payment Amount</p>

          <p className="mt-1 text-4xl font-bold tracking-tight md:text-5xl">
            ৳{amount}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            <AlertCircle className="h-3.5 w-3.5" />
            Payment Failed
          </div>
        </section>

        {/* Payment Details */}
        <section className="mt-10 overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="border-b px-5 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">Payment Details</h2>

                <p className="text-xs text-muted-foreground">
                  Information about the failed payment attempt
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {/* Transaction ID */}
            <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
              <span className="text-sm text-muted-foreground">
                Transaction ID
              </span>

              <span className="text-sm font-medium break-all sm:text-right">
                {payment.transactionId}
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between px-5 py-4 md:px-6">
              <span className="text-sm text-muted-foreground">
                Payment Method
              </span>

              <span className="text-sm font-medium">
                {payment.method || "Online Payment"}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between px-5 py-4 md:px-6">
              <span className="text-sm text-muted-foreground">
                Payment Status
              </span>

              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                {payment.status}
              </span>
            </div>
          </div>
        </section>

        {/* Booking Details */}
        <section className="mt-5 overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="border-b px-5 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CalendarDays className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold">Booking Details</h2>

                <p className="text-xs text-muted-foreground">
                  Your service booking information
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {/* Service */}
            <div className="flex items-center justify-between px-5 py-4 md:px-6">
              <span className="text-sm text-muted-foreground">Service</span>

              <span className="text-right text-sm font-semibold">
                {payment.booking.service.serviceName}
              </span>
            </div>

            {/* Booking ID */}
            <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
              <span className="text-sm text-muted-foreground">Booking ID</span>

              <span className="text-sm font-medium break-all sm:text-right">
                {payment.booking.id}
              </span>
            </div>

            {/* Booking Status */}
            <div className="flex items-center justify-between px-5 py-4 md:px-6">
              <span className="text-sm text-muted-foreground">
                Booking Status
              </span>

              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                {payment.booking.status}
              </span>
            </div>
          </div>
        </section>

        {/* Help / Information */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border bg-background p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div>
            <p className="text-sm font-medium">
              No successful payment was recorded
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              If your bank or card provider shows a temporary charge, please
              allow some time for it to be reversed. You can also contact
              support if the issue persists.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <PayAgainButton bookingId={payment.booking.id} />

          <Link
            href="/dashboard/bookings"
            className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            View My Bookings
          </Link>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          If you continue experiencing problems, please contact FixItNow
          support.
        </p>
      </div>
    </main>
  )
}
