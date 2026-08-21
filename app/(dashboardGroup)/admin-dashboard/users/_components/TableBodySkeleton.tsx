import { Skeleton } from "@/components/ui/skeleton"

export default function TableBodySkeleton() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index} className="border-b last:border-0">
          {/* User */}
          <td className="px-4 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </td>

          {/* Phone */}
          <td className="px-4 py-4">
            <Skeleton className="h-4 w-24" />
          </td>

          {/* Role */}
          <td className="px-4 py-4">
            <Skeleton className="h-7 w-24 rounded-full" />
          </td>

          {/* Status */}
          <td className="px-4 py-4">
            <Skeleton className="h-7 w-20 rounded-full" />
          </td>

          {/* Joined */}
          <td className="px-4 py-4">
            <Skeleton className="h-4 w-24" />
          </td>

          {/* Action */}
          <td className="px-4 py-4 text-right">
            <Skeleton className="ml-auto size-8 rounded-md" />
          </td>
        </tr>
      ))}
    </tbody>
  )
}
