"use client"
import { makePayment } from '@/app/(dashboardGroup)/_actions/customerDashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

export default function PayAgainButton({bookingId}:{bookingId:string}) {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        try {
          const result = await makePayment(bookingId)
          if (result.success) {
            router.push(result.data.paymentUrl)
            toast.success("Payment successfull")
          } else {
            toast.error("Payment failed")
          }
        } catch (error) {
          console.log(error)
        }
      }}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 h-10 cursor-pointer"
    >
      Try Payment Again
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
}
