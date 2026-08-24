import React from "react"
import { getMyServices } from "../../_actions/technicianDashboard/my-service"
import { ServiceGrid } from "../../_components/technicianDashboard/ServiceGrid"

export default async function MyServicePage() {
  const serviceResponse = await getMyServices()
  // console.log("ssssss ", serviceResponse);
  const services = serviceResponse.data

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <p className="text-sm font-medium text-violet-600">My Services</p>
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          Services You Offer
        </h1>
        <p className="mt-1 text-muted-foreground">
          {services?.length} service{services.length !== 1 ? "s" : ""} listed
        </p>
      </div>

      <ServiceGrid services={services} />
    </div>
  )
}
