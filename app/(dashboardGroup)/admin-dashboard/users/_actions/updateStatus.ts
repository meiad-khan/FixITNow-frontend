"use server"

import { revalidatePath} from "next/cache"
import { cookies } from "next/headers"

export const updateUserStatus = async (id:string, status:string) => {
   const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  
  const payload = {
    userStatus:status
  }
  
    // console.log("access token is ", accessToken);
  
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
      {
        method:"PATCH",
        headers: {
          "Content-type":"application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body:JSON.stringify(payload)
      }
    )
  const result = await res.json()
  revalidatePath("/admin-dashboard/users");

  return result
}