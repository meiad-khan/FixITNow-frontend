"use client"

import React, { useTransition } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MetaProps {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface PaginationProps {
  meta: MetaProps
}

const Pagination = ({ meta }: PaginationProps) => {

  // console.log("meta is ",meta)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentPage = meta.page
  const limit = meta.limit
  const total = meta.total
  const totalPage = meta.totalPages

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPage]
    }

    if (currentPage >= totalPage - 2) {
      return [1, "...", totalPage - 2, totalPage - 1, totalPage]
    }

    return [1, "...", currentPage, "...", totalPage]
  }

  const pageNumbers = getPageNumbers()

  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1
  const endItem = Math.min(currentPage * limit, total)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage || newPage === currentPage) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`,{scroll:false})
    })
  }

  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{startItem}</span>{" "}
        to <span className="font-medium text-foreground">{endItem}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> users
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isPending}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${index}`}
                  className="flex size-8 items-center justify-center text-sm text-muted-foreground"
                >
                  ...
                </span>
              )
            }

            return (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                className="size-8"
                onClick={() => handlePageChange(page)}
                disabled={isPending}
              >
                {isPending && page === currentPage ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  page
                )}
              </Button>
            )
          })}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPage || isPending}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
