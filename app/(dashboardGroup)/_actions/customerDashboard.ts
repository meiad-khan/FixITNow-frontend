"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const getMyBookings = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("access token is ", accessToken);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
   cache:"no-cache"
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

  // console.log("payload is ", payload);

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
  revalidatePath("/dashboard/profile");

  return result
}


export const makePayment = async (id:string) => {  
  const cookieStore = await cookies();
   const accessToken = cookieStore.get("accessToken")?.value
  
  if (!accessToken) {
    return {
      success: false,
      message:"You are not logged in!"
    }
  }
  
   // console.log("access token is ", accessToken);
  const payload = {
    bookingId:id,
  }
  // console.log("Payload is ",payload)
   const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/init`, {
     method: "POST",
     headers: {
       "Content-type": "application/json",
       Cookie: `accessToken=${accessToken}`,
     },
     body:JSON.stringify(payload)
   })
  const result = await res.json();
  revalidatePath("/dashboard");
  // console.log("payment result is ", result);
   return result
}


export const getPaymentDetails = async (tran_id: string) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payment/success/${tran_id}`, {
    headers: {
       Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-cache"
  });
  const result = await res.json();
  return result;
}

type ReviewPayload = {
  bookingId: string
  rating: number
  reviewText:string
}

export const makeReview = async (payload:ReviewPayload) => {
   const cookieStore = await cookies()
   const accessToken = cookieStore.get("accessToken")?.value

   // console.log("access token is ", accessToken);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
     method:"POST",
    headers: {
       "Content-type":"application/json",
       Cookie: `accessToken=${accessToken}`,
    },
    body:JSON.stringify(payload)
   })
   const result = await res.json()
   return result
}