"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

type CreateServicePayload = {
  technicianId: string
  categoryId: string
  serviceName: string
  description: string
  basePrice: number
}

export const createService = async (payload: CreateServicePayload) => {
  const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
  
  try {
   const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Cookie: `accessToken=${accessToken}`,
     },
     body: JSON.stringify(payload),
   })
    const result = await res.json()
    revalidatePath("/service");
    return result
  } catch (error) {
    console.error("Failed to create service:", error)

    return {
      success: false,
      message: "Something went wrong",
    }
  }
}
