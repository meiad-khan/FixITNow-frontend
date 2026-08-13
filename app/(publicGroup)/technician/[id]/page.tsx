import React from 'react'

export default async function TechnicianDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
  }) {
  const { id } = await params;

  return <div>
    Technician id is :{id}
  </div>
}
