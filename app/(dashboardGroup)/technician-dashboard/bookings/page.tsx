import React from 'react'
import { getAllBookingsForTechnician } from '../../_actions/technicianDashboard/technician-bookings'

export default async function MyBookingsPage() {

  const bookingResponse = await getAllBookingsForTechnician();
  console.log("booking ", bookingResponse);
  const bookings = bookingResponse.data;

  return (
    <div>
      This is my booking page
    </div>
  )
}
