import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const Pagination = () => {
  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">1</span> to{" "}
        <span className="font-medium text-foreground">10</span> of{" "}
        <span className="font-medium text-foreground">100</span> users
      </p>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground">
          1
        </div>

        <Button variant="outline" size="sm" className="gap-1">
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
