"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"

const FilterByRole = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const updateParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!value || value === "ALL") {
      params.delete("role")
    } else {
      params.set("role", value)
    }
    params.set("page", "1")

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  return (
    <Select
      value={searchParams.get("role") || "ALL"}
      onValueChange={(value) => updateParams(value)}
      disabled={isPending}
    >
      <SelectTrigger className="h-11 w-full sm:w-44">
        {isPending ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            <span>Updating...</span>
          </div>
        ) : (
          <SelectValue placeholder="Filter by role" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">All Roles</SelectItem>
        <SelectItem value="CUSTOMER">Customers</SelectItem>
        <SelectItem value="TECHNICIAN">Technicians</SelectItem>
        <SelectItem value="ADMIN">Administrators</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default FilterByRole
