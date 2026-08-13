"use client"

import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"

export default function ServiceFilter({
  technicianLocation,
  categoryNames,
}: {
  technicianLocation: string[]
  categoryNames: string[]
  }) {
  
   const pathname = usePathname()
   const searchParams = useSearchParams()
  const router = useRouter()
  
   const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)
   
   const updateParam = (key: string, value: string) => {
     console.log("key is ", key, "value is ", value)

     if (debouncedReference.current) {
       clearTimeout(debouncedReference.current)
     }
     debouncedReference.current = setTimeout(() => {
       const params = new URLSearchParams(searchParams.toString())
       if (!value || value === "all") {
         params.delete(key)
       } else {
         params.set(key, value)
       }
       router.replace(`${pathname}?${params.toString()}`)
     }, 500)
   }
  
  
  const minPrice = Number(searchParams.get("minPrice") ?? 500)
  const maxPrice = Number(searchParams.get("maxPrice") ?? 10000)
  
  const updatePriceRange = (values: number[]) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current)
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      params.set("minPrice", values[0].toString())
      params.set("maxPrice", values[1].toString())

      router.replace(`${pathname}?${params.toString()}`)
    }, 500)
  }
  
  
  return (
    <aside className="w-full lg:w-60">
      <div className="sticky top-24 rounded-xl border bg-background p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Filters</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Refine your results
            </p>
          </div>

          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs"
          onClick={()=>router.replace(`${pathname}`)}
          >
            <RotateCcw className="mr-1.5 size-3.5" />
            Reset
          </Button>
        </div>

        <Separator className="my-5" />

        {/* Category */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Service Category</h4>

          <div>
            <Select
              value={searchParams.get("category") ?? "all"}
              onValueChange={(value) => updateParam("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>

                {categoryNames.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Location */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Location</h4>

          <div className="space-y-3">
            <Select
              value={searchParams.get("location") ?? "all"}
              onValueChange={(value) => updateParam("location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>

                {technicianLocation.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Price */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Price Range</h4>

          <Slider
            defaultValue={[minPrice, maxPrice]}
            min={0}
            max={20000}
            step={500}
            onValueChange={updatePriceRange}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>৳{minPrice}</span>
            <span>৳{maxPrice}+</span>
          </div>
        </div>
      </div>
    </aside>
  )
}