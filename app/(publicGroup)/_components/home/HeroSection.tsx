import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, ShieldCheck, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  return (
    <section className="overflow-hidden border-b bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <Badge variant="secondary" className="mb-5 gap-2 px-3 py-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Trusted Home Services
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Home,
              <span className="text-primary"> Fixed Right.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find trusted professionals for plumbing, electrical work,
              cleaning, repairs, and more. Get quality service right at your
              doorstep.
            </p>

            {/* Search */}
            <div className="mt-7 flex w-full max-w-xl flex-col gap-2 rounded-xl border bg-background p-2 shadow-sm sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="What service do you need?"
                  className="h-11 border-0 pl-10 shadow-none focus-visible:ring-0"
                />
              </div>

              <Button className="h-11 px-6">Search</Button>
            </div>

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
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                  <Users className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">500+</p>
                  <p className="text-xs text-muted-foreground">Professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
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
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-muted shadow-xl">
              <Image
                src="/images/home/hero-technician.jpg"
                alt="Professional technician providing home service"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 left-3 rounded-xl border bg-background p-3 shadow-lg sm:left-5 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
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
