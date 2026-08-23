"use server"

type TecnicianQuery = {
  searchTerm?: string
  location?: string
  category?: string
  serviceName?:string
  minExperience?: string
  maxExperience?: string
  rating?: string
  limit?: string
  page?: string
  sortBy?: string
  sortOrder?: string
}

export const getAllTechnician = async ({
  query
}: {
  query?: TecnicianQuery
  }) => {
  
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm)
  }

   if (query && query.category) {
     params.set("category", query.category)
   }
   if (query && query.location) {
     params.set("location", query.location)
   }
   if (query && query.serviceName) {
     params.set("serviceName", query.serviceName)
   }
   if (query && query.minExperience) {
     params.set("minExperience", query.minExperience)
   }
   if (query && query.maxExperience) {
     params.set("maxPrice", query.maxExperience)
   }
   if (query && query.rating) {
     params.set("rating", query.rating)
   }
   if (query && query.sortBy) {
     params.set("sortBy", query.sortBy)
   }
   if (query && query.sortOrder) {
     params.set("sortOrder", query.sortOrder)
   }
  if (query?.page) {
    params.set("page", query.page)
  }

  if (query?.limit) {
    params.set("limit", query.limit)
  }
  
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician?${params.toString()}`, {
    next: {
      revalidate: 300,
      tags: ["technicians"],
    },
  })
  const result = await res.json()
  return result
}



export const getSingleTechnician = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/${id}`, {
    next: {
      tags:[`technician-${id}`]
    }
  })
  const result = await res.json();
  console.log("result is ", result);
  return result;
}