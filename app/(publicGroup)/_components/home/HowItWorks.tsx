import { ArrowRight, CalendarCheck, Search, UserCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Service",
    description: "Browse our services and find exactly what your home needs.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Choose a Professional",
    description:
      "Explore technicians and choose the right professional for your job.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book & Pay",
    description:
      "Choose your booking details and make a secure one-time payment.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            Simple Process
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            How FixIT Now Works
          </h2>

          <p className="mt-4 text-muted-foreground">
            Getting professional help for your home takes just a few simple
            steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                  <Icon className="size-7" />
                </div>

                <span className="mt-5 block text-xs font-bold tracking-widest text-primary">
                  STEP {step.number}
                </span>

                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute top-7 right-0 hidden size-5 text-muted-foreground md:block" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
