"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Wrench } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Service = {
  name: string
  description: string
  image: string
}

export default function HomeServiceCard({ services }: { services: Service[] }) {
  
  const router = useRouter();

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.name}
          className="group cursor-pointer overflow-hidden py-0 transition-shadow hover:shadow-lg"
          onClick={() => router.push(`/service?searchTerm=${service.name}`)}
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={service.image}
              alt={service.name}
              fill
              unoptimized
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
  )
}
