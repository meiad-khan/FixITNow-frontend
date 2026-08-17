"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { Availability } from "../_components/profile/profile-utils"


interface UpdateProfilePayload {
  name?: string
  phone?: string | null
  bio?: string
  location?: string
  experienceYears?: number
  profilePhoto?: string
  availability?: Availability
}

export async function updateTechnicianProfile(payload: UpdateProfilePayload) {
  const accessToken = (await cookies()).get("accessToken")?.value

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/update-profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null)
    throw new Error(errorBody?.message || "Failed to update profile")
  }

  const data = await res.json()
  revalidatePath("/technician-dashboard/profile")
  return data
}
