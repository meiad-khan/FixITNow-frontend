"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react";

export default function TechnicianSearch() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    // console.log("value ", value);
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (value) {
        params.set("searchTerm", value)
      } else {
        params.delete("searchTerm")
      }
      router.replace(`${pathname}?${params.toString()}`);
    },500)

    
  }

  return (
    <div className="w-full sm:w-[320px] lg:w-95">
      <div className="relative">
        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          defaultValue={searchParams.get("searchTerm") ? searchParams.get("searchTerm")?.toString() : ""}
          onChange={(e)=>handleChange(e.target.value)}
          placeholder="Search technicians..."
          className="h-11 w-full rounded-lg pl-10"
        />
      </div>
    </div>
  )
}
