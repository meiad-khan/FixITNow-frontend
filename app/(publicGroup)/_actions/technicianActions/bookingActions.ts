"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

type CreateBookingPayload = {
  serviceId: string
  scheduledAt: string
  customerNote?: string
}

export const createBooking = async (payload: CreateBookingPayload) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You must be logged in to create a booking",
      }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create booking",
      }
    }

    revalidatePath("/dashboard/bookings")

    return result
  } catch (error) {
    console.error("Create booking error:", error)

    return {
      success: false,
      message: "Something went wrong while creating the booking",
    }
  }
}
