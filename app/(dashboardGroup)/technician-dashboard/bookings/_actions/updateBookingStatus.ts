"use server"

import { BookingStatus } from "@/lib/type"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const updateBookingStatus = async (id:string, status:BookingStatus) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  console.log(id);
  const payload = {
    status:status
  }
  console.log(JSON.stringify(payload));
  // console.log("access token is ", accessToken);
  //${process.env.BACKEND_API_URL}
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  })
  const result = await res.json()
  // console.log(result)
  revalidatePath("/technician-dashboard/bookings")
  return result
}