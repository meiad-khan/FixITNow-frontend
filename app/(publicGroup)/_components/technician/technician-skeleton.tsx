import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function TechnicianSkeleton() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <Skeleton className="h-4 w-40" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-background"
          >
            <Skeleton className="h-1 w-full rounded-none" />

            <div className="space-y-5 p-5">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <Skeleton className="size-14 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Experience */}
              <Skeleton className="h-6 w-36 rounded-full" />

              {/* Services */}
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />

                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              <Separator />

              {/* Availability */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>

              {/* Button */}
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
