import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceSkeleton() {
  return (
    <div className="space-y-8">
      {/* Result count skeleton */}
      <Skeleton className="h-4 w-36" />

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border bg-background"
          >
            <Skeleton className="h-1 w-full rounded-none" />

            <div className="space-y-5 p-6">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-20" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <Skeleton className="size-9 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              <div className="flex justify-between border-t pt-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-7 w-24" />
                </div>
              </div>

              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
