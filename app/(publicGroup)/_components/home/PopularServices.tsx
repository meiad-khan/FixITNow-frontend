import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Wrench } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    name: "Plumbing",
    description: "Leaks, pipes & fixtures",
    image: "/images/home/plumber.jpg",
  },
  {
    name: "Electrical",
    description: "Wiring & electrical repair",
    image: "/images/home/electrician.jpg",
  },
  {
    name: "AC Repair",
    description: "Cooling & maintenance",
    image: "/images/home/ac-repair.jpg",
  },
  {
    name: "Appliance Repair",
    description: "Repair your appliances",
    image: "/images/home/appliance-repair.jpg",
  },
  {
    name: "Cleaning",
    description: "Professional home cleaning",
    image: "/images/home/cleaning.jpg",
  },
  {
    name: "Carpentry",
    description: "Furniture & woodwork",
    image: "/images/home/carpenter.jpg",
  },
]

export default function PopularServices() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              Explore Services
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Popular Home Services
            </h2>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Whatever your home needs, find the right professional for the job.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/service">
              View All Services
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.name}
              className="group overflow-hidden py-0 transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Wrench className="size-4 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
