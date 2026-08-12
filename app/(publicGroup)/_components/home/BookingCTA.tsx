import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

const benefits = [
  "Trusted professionals",
  "Transparent service pricing",
  "Secure one-time payment",
]

export default function BookingCTA() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:px-16 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase opacity-80">
                Get Started Today
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Need a Home Service?
                <br />
                We&apos;ve Got You Covered.
              </h2>

              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Find the right professional, book your service, and get the job
                done without the hassle.
              </p>
            </div>

            <div className="lg:ml-auto">
              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle2 className="size-5 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" variant="secondary" className="mt-7">
                <Link href="/service">
                  Browse Services
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
