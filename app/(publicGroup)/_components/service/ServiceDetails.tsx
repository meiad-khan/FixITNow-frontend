"use client"

import {
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ServiceBooking from "./ServiceBooking"
import Image from "next/image"

type ServiceDetailsProps = {
  service: {
    id: string
    serviceName: string
    description: string
    basePrice: string
    status: string
    technician: {
      location: string
      availability: Record<string, string[]>
      experienceYears: number
      profilePhoto: string
      user: {
        name: string
        email: string
      }
    }
  }
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const { technician } = service

  return (
    <div className="min-h-screen bg-muted/30">
      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="space-y-6">
            {/* Service Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-3xl font-bold tracking-tight">
                        {service.serviceName}
                      </h1>

                      <Badge
                        variant={
                          service.status === "AVAILABLE"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {service.status === "AVAILABLE"
                          ? "Available"
                          : service.status}
                      </Badge>
                    </div>

                    <p className="text-2xl font-bold">৳{service.basePrice}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Service</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>

            {/* Technician */}
            <Card>
              <CardHeader>
                <CardTitle>Technician</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {technician.profilePhoto ? (
                      <Image
                        src={technician.profilePhoto}
                        alt={technician.user.name}
                        width={56}
                        height={56}
                        className="size-full object-cover"
                      />
                    ) : (
                      <UserRound className="size-6 text-primary" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">{technician.user.name}</h2>

                      <CheckCircle2 className="size-4 text-primary" />
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {technician.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Wrench className="size-3.5" />
                        {technician.experienceYears} years experience
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <BriefcaseBusiness className="mb-2 size-5 text-primary" />

                  <p className="text-sm font-medium">Professional Service</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Provided by an experienced technician
                  </p>
                </div>

                <div className="rounded-lg bg-muted/50 p-4">
                  <MapPin className="mb-2 size-5 text-primary" />

                  <p className="text-sm font-medium">Service Location</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {technician.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* =====================================================
              RIGHT SIDE - BOOKING
          ====================================================== */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="border-b bg-background">
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="size-5" />
                  Book This Service
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Choose a date and available time.
                </p>
              </CardHeader>

              <CardContent className="p-5">
                <ServiceBooking
                  serviceId={service.id}
                  serviceName={service.serviceName}
                  basePrice={service.basePrice}
                  availability={technician.availability}
                  technicianName={technician.user.name}
                />
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  )
}
