"use client"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
   const [searchValue, setSearchValue] = useState(
     searchParams.get("searchTerm") || ""
   )

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current)
    }
    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (value.trim()) {
        params.set("searchTerm", value)
      } else {
        params.delete("searchTerm")
      }
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    }, 500)
  }

   const handleClearSearch = () => {
     if (debouncedReference.current) {
       clearTimeout(debouncedReference.current)
     }

     setSearchValue("")

     const params = new URLSearchParams(searchParams.toString())
     params.delete("searchTerm")

     router.replace(`${pathname}?${params.toString()}`, {
       scroll: false,
     })
   }


  return (
    <div className="relative flex-1">
      <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name, email, phone or role..."
        className="h-11 pl-9"
      />
      {searchValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClearSearch}
          className="absolute top-1/2 right-1 size-8 -translate-y-1/2 hover:bg-transparent"
        >
          <X className="size-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  )
}

export default SearchBar
