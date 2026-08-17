"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const getMyBookings = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("access token is ", accessToken);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 2,
      tags: ["customer-bookings"],
    },
  })
  const result = await res.json()
  return result
}

export const getMyPayments = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("access token is ", accessToken);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["customer-payments"],
    },
  })
  const result = await res.json()
  return result
}

export const updateProfile = async (formData: FormData) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone") || null,
  }

  console.log("payload is ", payload);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/update-profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  )

  const result = await res.json()

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Failed to update profile",
    }
  }

  revalidateTag("my-profile","max");

  return result
}