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

import TechnicianFilter from "./technician-filter"

type MobileTechnicianFilterProps = {
  technicianLocation: string[]
  categoryNames: string[]
}

export default function MobileTechnicianFilter({
  technicianLocation,
  categoryNames,
}: MobileTechnicianFilterProps) {
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
          <SheetTitle>Filter Technicians</SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-1 pb-6">
          <TechnicianFilter
            technicianLocation={technicianLocation}
            categoryNames={categoryNames}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
