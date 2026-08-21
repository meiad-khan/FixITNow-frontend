"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const FilterByRole = () => {

  const pathname = usePathname();
    const searchParams = useSearchParams();
  const router = useRouter();
  
  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  const updateParams = (value: string) => {
    // console.log("value is ", value);
    if (debouncedReference.current) {
       clearTimeout(debouncedReference.current)
     }
    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (!value || value === "ALL") {
        params.delete("role")
      } else {
        params.set("role",value);
      }
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    },500)
  }

  return (
    <Select
      value={searchParams.get("role") || "ALL"}
      onValueChange={(value)=>updateParams(value)}
    >
      <SelectTrigger className="h-11 w-full sm:w-44">
        <SelectValue placeholder="Filter by role" />
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
