import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: UserRoundCheck,
    title: "Verified Professionals",
    description:
      "Connect with skilled and trusted technicians for your home service needs.",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    description:
      "Know the service price before booking with no confusing subscription fees.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Make secure one-time payments for every service booking.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Service",
    description:
      "Get professional service and share your experience through reviews.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            Why FixIT Now
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Service You Can Count On
          </h2>

          <p className="mt-4 text-muted-foreground">
            We make finding and booking reliable home services simple,
            transparent, and convenient.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <Card key={feature.title} className="border bg-background">
                <CardContent className="p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>

                  <h3 className="mt-5 font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
