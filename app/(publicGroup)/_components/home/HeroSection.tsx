import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import HeroSearch from "./HeroSearch"

export default function HeroSection() {
  return (
    <section className="overflow-hidden border-b bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
          {/* Left */}
          <div className="min-w-0">
            <Badge variant="secondary" className="mb-4 gap-2 px-3 py-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Trusted Home Services
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Home,
              <span className="text-primary"> Fixed Right.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find trusted professionals for plumbing, electrical work,
              cleaning, repairs, and more. Get quality service right at your
              doorstep.
            </p>

            {/* Search */}
            <div className="mt-6">
              <HeroSearch />
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/service">
                  Browse Services
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/technician">Find a Technician</Link>
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Users className="size-4 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">500+</p>
                  <p className="text-xs text-muted-foreground">Professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Star className="size-4 fill-primary text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">4.9/5</p>
                  <p className="text-xs text-muted-foreground">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative mx-auto w-full max-w-xl md:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-muted shadow-xl">
              <Image
                src="/images/home/hero-technician.jpg"
                alt="Professional technician providing home service"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 left-3 max-w-[calc(100%-1.5rem)] rounded-xl border bg-background p-3 shadow-lg sm:left-5 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Verified Professionals
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Quality service guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
