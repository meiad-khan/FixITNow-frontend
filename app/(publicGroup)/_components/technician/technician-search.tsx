"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function TechnicianSearch() {
  return (
    <div className="w-full sm:w-[320px] lg:w-[380px]">
      <div className="relative">
        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Search technicians..."
          className="h-11 w-full rounded-lg pl-10"
        />
      </div>
    </div>
  )
}
