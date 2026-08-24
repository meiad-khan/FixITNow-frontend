import React from "react"
import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  Star,
  Wrench,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TechnicianBooking from "../../_components/technician/TechnicianBooking"
import { getSingleTechnician } from "../../_actions/technicianActions/technicianActions"
import TechnicianServices from "../../_components/technician/TechnicianServices"
import TechnicianAvailability from "../../_components/technician/TechnicianAvailability"
import TechnicianReviews from "../../_components/technician/TechnicianReviews"
import { Review } from "@/lib/type"
import CreateBookingModal from "../../_components/technician/CreateBookingModal"


export default async function TechnicianDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
  }) {
  
  const { id } = await params

  const response = await getSingleTechnician(id);
  const { technician, reviews } = response.data;
  // console.log("Technician is ", technician.availability);

  const reviewCount = reviews.length
  
     const averageRating =
       reviewCount > 0
         ? reviews.reduce(
             (sum: number, review: Review) => sum + review.rating,
             0
           ) / reviewCount
         : 0
 
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Technician */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar className="size-28 border-4 border-background shadow-md sm:size-32">
                <AvatarImage
                  src={technician.profilePhoto}
                  alt={technician.user.name}
                />

                <AvatarFallback className="text-2xl">
                  {technician.user.name
                    .split(" ")
                    .map((name: string) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {technician.user.name}
                  </h1>

                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="size-3.5" />
                    Verified
                  </Badge>
                </div>

                <p className="text-lg text-muted-foreground">
                  {technician.bio}
                </p>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {technician.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Wrench className="size-4" />
                    {technician.experienceYears} years experience
                  </span>

                  <span className="flex items-center gap-1.5 text-foreground">
                    <Star className="size-4 fill-current" />
                    {averageRating > 0 ? averageRating.toFixed(1) : "No rating"}
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <CreateBookingModal
              services={technician.services}
              availability={technician.availability}
              technicianName={technician.user.name}
              technicianId={id}
            />
          </div>
        </div>
      </section>

      {/* content */}
      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* left side */}
          <div className="space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Technician</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {technician.bio}. With
                  <span className="font-medium text-foreground">
                    {technician.experienceYears} years
                  </span>
                  of professional experience,
                  <span className="font-medium text-foreground">
                    {technician.user.name}
                  </span>
                  provides reliable home services in {technician.location}.
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <TechnicianServices services={technician.services} />

            {/* Availability */}
            <TechnicianAvailability availability={technician.availability} />

            {/* Reviews */}
            <TechnicianReviews reviews={reviews} />
          </div>

          {/* Booking */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden shadow-sm">
              <CardHeader className="border-b bg-background">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-5" />
                  Book This Technician
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Choose a service, date and available time.
                </p>
              </CardHeader>

              <CardContent className="p-5">
                <TechnicianBooking
                  services={technician.services}
                  availability={technician.availability}
                  technicianName={technician.user.name}
                  redirectTo={`/technician/${technician.id}`}
                />
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  )
}
