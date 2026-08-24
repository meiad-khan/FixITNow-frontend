import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import HomeServiceCard from "../service/HomeServiceCard"

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
        <HomeServiceCard services={services} />
      </div>
    </section>
  )
}
