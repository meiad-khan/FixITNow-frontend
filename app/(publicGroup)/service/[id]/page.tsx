import React from "react"

import { getSingleService } from "../../_actions/serviceActions/serviceActions"
import ServiceDetails from "../../_components/service/ServiceDetails"

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const result = await getSingleService(id)

  const service = result.data

  return <ServiceDetails service={service} />
}
