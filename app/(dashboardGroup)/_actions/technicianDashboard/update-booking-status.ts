"use server"

import { cookies } from "next/headers"
import { revalidatePath, revalidateTag } from "next/cache"
import { BookingStatus } from "@/lib/type"

// backend expects lowercase — adjust here if that changes
// const STATUS_PAYLOAD: Record<string, string> = {
//   ACCEPTED: "accepted",
//   DECLINED: "declined",
//   COMPLETED: "completed",
//   IN_PROGRESS: "in_progress",
//   CANCELLED: "cancelled",
// }

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status: status }),
    }
  )

  const result = await res.json()

  // console.log("result is ", result);

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to update booking status")
  }

  revalidateTag("technician-bookings", "max")
  revalidatePath("/technician-dashboard")
  return result
}
