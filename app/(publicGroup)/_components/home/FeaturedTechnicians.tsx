import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const technicians = [
  {
    name: "Rahim Ahmed",
    service: "Professional Plumber",
    location: "Dhaka",
    rating: "4.9",
    experience: "6 Years",
    image: "/images/home/plumber.jpg",
  },
  {
    name: "Tanvir Hasan",
    service: "Electrical Technician",
    location: "Dhaka",
    rating: "4.8",
    experience: "5 Years",
    image: "/images/home/electrician.jpg",
  },
  {
    name: "Sakib Khan",
    service: "AC Specialist",
    location: "Dhaka",
    rating: "4.9",
    experience: "7 Years",
    image: "/images/home/ac-repair.jpg",
  },
]

export default function FeaturedTechnicians() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              Our Professionals
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Technicians
            </h2>

            <p className="mt-3 text-muted-foreground">
              Meet some of the professionals ready to help you.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/technician">
              View All
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {technicians.map((technician) => (
            <Card key={technician.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarImage src={technician.image} alt={technician.name} />
                    <AvatarFallback>
                      {technician.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      {technician.name}
                    </h3>

                    <p className="truncate text-sm text-muted-foreground">
                      {technician.service}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-sm">
                      <Star className="size-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{technician.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    <MapPin className="mr-1 size-3" />
                    {technician.location}
                  </Badge>

                  <Badge variant="outline">{technician.experience}</Badge>
                </div>

                <Button asChild variant="outline" className="mt-5 w-full">
                  <Link href="/technician">View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
