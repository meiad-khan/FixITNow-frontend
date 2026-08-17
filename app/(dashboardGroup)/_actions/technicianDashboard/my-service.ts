"use server"

import { cookies } from "next/headers"

export const getMyServices = async () => {
   const cookieStore = await cookies()
      const accessToken = cookieStore.get("accessToken")?.value
    
      // console.log("access token is ", accessToken);
    
      const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/services/technician`,
        {
          headers: {
            Cookie: `accessToken=${accessToken}`,
          },
          next: {
            revalidate: 60 * 60 * 24,
            tags: ["technician-services"],
          },
        }
      )
      const result = await res.json()
      return result
}