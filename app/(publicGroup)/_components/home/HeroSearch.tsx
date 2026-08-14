"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export default function HeroSearch() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault() 
    // console.log("value is ", searchValue)
    if (searchValue) {
      router.push(`/service?searchTerm=${searchValue}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mt-7 flex w-full max-w-xl flex-col gap-2 rounded-xl border bg-background p-2 shadow-sm sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What service do you need?"
          className="h-11 border-0 pl-10 shadow-none focus-visible:ring-0"
        />
      </div>

      <Button type="submit" className="h-11 cursor-pointer px-6">
        Search
      </Button>
    </form>
  )
}
