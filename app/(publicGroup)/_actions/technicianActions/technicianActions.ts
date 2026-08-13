export const getAllTechnician = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician`, {
    next: {
      revalidate: 300,
      tags:["technicians"]
    }
  })
  const result = await res.json()
  return result
}

export const getSingleTechnician = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/${id}`)
  const result = await res.json();
  return result;
}