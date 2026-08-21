"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react";

export default function ServiceSearchCard() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleSearch = async (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current)
    }
    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) {
        params.set("searchTerm",value)
      } else {
        params.delete("searchTerm")
      }
      router.replace(`${pathname}?${params.toString()}`,{scroll:false})
    },500)
  }


  return (
    <div className="w-full sm:w-[320px] lg:w-95">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          defaultValue={searchParams.get("searchTerm") ? searchParams.get("searchTerm")?.toString() : ""}
          onChange={(e)=>handleSearch(e.target.value)}
          placeholder="Search services..."
          className="h-10 bg-background pl-10"
        />
      </div>
    </div>
  )
}
