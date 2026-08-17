import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getMyPayments } from "../../_actions/customerDashboard"
import ViewPaymentDetailsButton from "../../_components/customerDashboard/ViewPaymentDetailsButton"
import { PaymentRecord } from "@/lib/type"



export default async function PaymentHistoryPage() {

  const payments = await getMyPayments()
  // console.log("paments ", payments.data[0].booking);

  if (payments.data.length === 0) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No payment history yet.
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
        <p className="text-sm text-muted-foreground">All your past payments</p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Paid At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.data.map((payment: PaymentRecord) => {
              const paidAtLabel = payment.paidAt
                ? new Date(payment.paidAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"

              return (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.booking.service.serviceName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell>৳{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.status}</Badge>
                  </TableCell>
                  <TableCell>{paidAtLabel}</TableCell>
                  <TableCell className="text-right">
                    <ViewPaymentDetailsButton
                      serviceName={payment.booking.service.serviceName}
                      technicianName={payment.booking.service.technician?.user.name}
                      transactionId={payment.transactionId}
                      amount={payment.amount}
                      provider={payment.provider}
                      method={payment.method}
                      status={payment.status}
                      paidAt={payment.paidAt}
                      createdAt={payment.createdAt}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
