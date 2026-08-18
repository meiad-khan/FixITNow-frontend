"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

type Availability = {
  [K in DayOfWeek]?: string[]
}

interface TechnicianProfile {
  profilePhoto: string
  bio: string
  experienceYears: number
  location: string
  availability: Availability
}

export const beATechnician = async (payload: TechnicianProfile) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  console.log("payload is ", payload);

  // console.log("access token is ", accessToken);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technician/profile`,
    {
      method:"POST",
      headers: {
        "Content-type":"application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body:JSON.stringify(payload)
    }
  )
  const result = await res.json()
  revalidatePath("/technician-dashboard/profile")
  console.log("result is ", result);
  return result
}