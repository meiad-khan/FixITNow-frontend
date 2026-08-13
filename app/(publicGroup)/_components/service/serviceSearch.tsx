"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function ServiceSearchCard() {
  return (
    <div className="w-full sm:w-[320px] lg:w-[380px]">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search services..."
          className="h-10 bg-background pl-10"
        />
      </div>
    </div>
  )
}
