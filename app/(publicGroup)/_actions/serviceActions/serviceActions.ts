export const getServices = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined }
  }) => {
  
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm",query.searchTerm as string)
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