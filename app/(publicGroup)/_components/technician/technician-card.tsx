import Image from "next/image"
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export interface TechnicianAvailability {
  [day: string]: string[]
}

export interface TechnicianService {
  serviceName: string
  category: {
    categoryName: string
  }
}

export interface Technician {
  id: string
  profilePhoto: string | null
  bio: string
  experienceYears: number
  location: string
  availability: TechnicianAvailability
  userId: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
  }
  services: TechnicianService[]
}

function formatDay(day: string) {
  return day.charAt(0).toUpperCase() + day.slice(1)
}

export function TechnicianCard({ technician }: { technician: Technician }) {
  const availabilityEntries = Object.entries(technician.availability ?? {})

  const displayedServices = technician.services.slice(0, 3)

  return (
    <div className="group overflow-hidden rounded-xl border bg-background transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Accent */}
      <div className="h-1 bg-primary" />

      <div className="p-5">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full border bg-muted">
            {technician.profilePhoto ? (
              <Image
                src={technician.profilePhoto}
                alt={technician.user.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <UserRound className="size-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">
              {technician.user.name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />

              <span className="truncate">{technician.location}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {technician.bio}
        </p>

        {/* Experience */}
        <div className="mt-4 flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 font-normal">
            <BriefcaseBusiness className="size-3.5" />
            {technician.experienceYears} years experience
          </Badge>
        </div>

        {/* Services */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Services
          </p>

          <div className="flex flex-wrap gap-2">
            {displayedServices.map((service) => (
              <Badge
                key={service.serviceName}
                variant="outline"
                className="font-normal"
              >
                {service.serviceName}
              </Badge>
            ))}

            {technician.services.length > 3 && (
              <Badge variant="secondary" className="font-normal">
                +{technician.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <Separator className="my-5" />

        {/* Availability */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />

            <h4 className="text-sm font-medium">Availability</h4>
          </div>

          <div className="space-y-2">
            {availabilityEntries.length > 0 ? (
              availabilityEntries.slice(0, 3).map(([day, slots]) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <span className="text-xs font-medium">{formatDay(day)}</span>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />

                    <span>{slots.join(", ")}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                Availability not provided
              </p>
            )}

            {availabilityEntries.length > 3 && (
              <p className="pt-1 text-xs text-muted-foreground">
                +{availabilityEntries.length - 3} more days available
              </p>
            )}
          </div>
        </div>

        {/* Action */}
        <Link href={`/technician/${technician.id}`}>
          <Button className="mt-5 w-full cursor-pointer">View Profile</Button>
        </Link>
      </div>
    </div>
  )
}
