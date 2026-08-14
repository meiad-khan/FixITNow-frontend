import { Skeleton } from "@/components/ui/skeleton"

export default function RegisterLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-b-lg border p-8 shadow-lg">
        {/* Heading skeleton */}
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-9 w-64" />
          <Skeleton className="mx-auto h-5 w-80" />
        </div>

        {/* Form skeleton */}
        <div className="rounded-xl border p-5">
          <div className="space-y-4">
            {/* Name */}
            <Skeleton className="h-10 w-full" />

            {/* Email */}
            <Skeleton className="h-10 w-full" />

            {/* Password */}
            <Skeleton className="h-10 w-full" />

            {/* Phone */}
            <Skeleton className="h-10 w-full" />

            {/* Role */}
            <Skeleton className="h-10 w-full" />

            {/* Register button */}
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Login link */}
        <div className="flex justify-center">
          <Skeleton className="h-5 w-52" />
        </div>
      </div>
    </div>
  )
}
