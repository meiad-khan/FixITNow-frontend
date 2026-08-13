"use client"

import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

const categories = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Cleaning",
  "AC Repair",
  "Appliance Repair",
]

const locations = [
  "Dhaka",
  "Gazipur",
  "Narayanganj",
  "Chittagong",
]

export default function ServiceFilter() {
  return (
    <aside className="w-full lg:w-[240px]">
      <div className="sticky top-24 rounded-xl border bg-background p-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              Filters
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Refine your results
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
          >
            <RotateCcw className="mr-1.5 size-3.5" />
            Reset
          </Button>
        </div>

        <Separator className="my-5" />

        {/* Category */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            Service Type
          </h4>

          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-3"
              >
                <Checkbox id={category} />

                <Label
                  htmlFor={category}
                  className="cursor-pointer text-sm font-normal"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-5" />

        {/* Location */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            Location
          </h4>

          <div className="space-y-3">
            {locations.map((location) => (
              <div
                key={location}
                className="flex items-center gap-3"
              >
                <Checkbox id={location} />

                <Label
                  htmlFor={location}
                  className="cursor-pointer text-sm font-normal"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-5" />

        {/* Rating */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            Minimum Rating
          </h4>

          <Slider
            defaultValue={[4]}
            min={1}
            max={5}
            step={0.5}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 star</span>
            <span>5 stars</span>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Price */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">
            Price Range
          </h4>

          <Slider
            defaultValue={[500, 10000]}
            min={0}
            max={20000}
            step={500}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>৳0</span>
            <span>৳20,000+</span>
          </div>
        </div>

      </div>
    </aside>
  )
}