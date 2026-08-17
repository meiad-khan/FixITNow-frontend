"use server"

import { cookies } from "next/headers"

export const getMyBookings = async () => {


  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  
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
  const result = await res.json();
  return result;
}