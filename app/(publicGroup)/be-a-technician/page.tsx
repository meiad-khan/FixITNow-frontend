
import { Wrench, ShieldCheck, Star, Briefcase } from "lucide-react"
import TechnicianForm from "./_components/TechnicianForm"


export default function BecomeTechnicianPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Wrench className="h-6 w-6 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Become a Technician
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600">
              Turn your skills into opportunities. Create your technician
              profile and start connecting with customers who need your
              services.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div>
            <TechnicianForm />
          </div>

          {/* Right side */}
          <aside className="space-y-5">
            {/* Benefits */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Why become a technician?
              </h2>

              <div className="mt-5 space-y-5">
                <Benefit
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Get more jobs"
                  description="Connect with customers looking for your skills."
                />

                <Benefit
                  icon={<Star className="h-5 w-5" />}
                  title="Build your reputation"
                  description="Earn reviews and grow your professional profile."
                />

                <Benefit
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Work on your schedule"
                  description="Set your availability and manage your bookings."
                />
              </div>
            </div>

            {/* Trust card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Your profile, your business
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Customers will be able to view your professional information
                    and availability before booking your service.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  )
}
