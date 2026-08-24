"use client"

import { SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import ServiceFilter from "./service-filter"

type MobileServiceFilterProps = {
  technicianLocation: string[]
  categoryNames: string[]
}

export default function MobileServiceFilter({
  technicianLocation,
  categoryNames,
}: MobileServiceFilterProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[320px] overflow-y-auto sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle>Filter Services</SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-1 pb-6">
          <ServiceFilter
            technicianLocation={technicianLocation}
            categoryNames={categoryNames}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
