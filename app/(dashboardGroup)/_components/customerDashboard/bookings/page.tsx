import { getMyBookings } from '@/app/(dashboardGroup)/_actions/customerDashboard'
import React from 'react'

export default async function BookingPage() {

  const bookings = await getMyBookings();

  return (
    <div>
      
    </div>
  )
}
