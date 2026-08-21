"use server"

import { cookies } from "next/headers"

type UserQuery = {
  searchTerm?: string;
  role?: "ADMIN" | "CUSTOMER" | "TECHNICIAN";

  page?: string;
  limit?: string;
}

export const getAllUsers = async ({ query }: { query?: UserQuery }) => {
  
  // console.log("query is ", query);
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm);
  }
  if (query && query.role) {
    params.set("role",query.role)
  }
  if (query?.page) {
    params.set("page", query.page)
  }

  if (query?.limit) {
    params.set("limit", query.limit)
  }

  const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
  
    // console.log("access token is ", accessToken);
  
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        next: {
          revalidate: 60,
          tags: ["all-users"],
        },
      }
    )
    const result = await res.json()
    return result
}


export const getUsersStats = async () => {
  // console.log("query is ", query)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("access token is ", accessToken);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/stats`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: {
        revalidate: 60,
        tags: ["all-users-stats"],
      },
    }
  )
  const result = await res.json()
  return result
}


export const getAllBookings = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("access token is ", accessToken);

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: {
      revalidate: 60,
      tags: ["all-bookings"],
    },
  })
  const result = await res.json()
  return result
}