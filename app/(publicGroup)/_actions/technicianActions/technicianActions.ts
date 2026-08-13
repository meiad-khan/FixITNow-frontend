"use server"

export const getAllTechnician = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined }
  }) => {
  
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string)
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
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/${id}`)
  const result = await res.json();
  return result;
}