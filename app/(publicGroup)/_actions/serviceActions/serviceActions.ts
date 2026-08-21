"use server"

type ServiceQuery = {
  searchTerm?: string
  location?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  limit?: string
  page?: string
  sortBy?: string
  sortOrder?:string
}


export const getAllServices = async ({
  query,
}: {
  query?: ServiceQuery
  }) => {
  
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm",query.searchTerm)
  }

  if (query && query.category) {
    params.set("category",query.category)
  }
  if (query && query.location) {
    params.set("location", query.location)
  }
  if (query && query.minPrice) {
    params.set("minPrice", query.minPrice)
  }
  if (query && query.maxPrice) {
    params.set("maxPrice", query.maxPrice)
  }
   if (query && query.sortBy) {
    params.set("sortBy", query.sortBy);
  }
  if (query && query.sortOrder) {
    params.set("sortOrder", query.sortOrder);
  }
   if (query?.page) {
     params.set("page", query.page)
   }

   if (query?.limit) {
     params.set("limit", query.limit)
   }
  
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services?${params.toString()}`, {
    next: {
      revalidate: 300,
      tags: ["services"],
    },
  })
  const result = await res.json()
  return result
}

export const getAllCategory = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24 * 2, //2 days
      tags: ["categories"]
    }
  });
  const result = await res.json();
  return result;
}