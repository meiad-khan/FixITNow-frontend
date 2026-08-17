"use server"

import { cookies } from "next/headers"

export const getAllBookingsForTechnician = async () => {
  const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
  
    // console.log("access token is ", accessToken);
  
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings/technician`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        next: {
          revalidate: 60 * 60 * 24,
          tags: ["technician-bookings"],
        },
      }
    )
    const result = await res.json()
    return result
}