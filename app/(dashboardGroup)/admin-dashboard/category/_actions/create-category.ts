"use server"

import { cookies } from "next/headers"
import { CreateCategoryValues } from "../_config/zod"
import { revalidatePath } from "next/cache"

export const createCategory = async (payload:CreateCategoryValues) => {
  const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
  
    // console.log("access token is ", accessToken);
  
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method:"POST",
    headers: {
        "Content-type":"application/json",
        Cookie: `accessToken=${accessToken}`,
    },
      body:JSON.stringify(payload)
  })
  
  const result = await res.json()
  revalidatePath("/admin-dashboard/category");
    return result
}