import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function LoginSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-b-lg border p-8 shadow-lg">
        {/* Heading skeleton */}
        <div className="space-y-2 text-center">
          <Skeleton className="mx-auto h-9 w-48" />
          <Skeleton className="mx-auto h-5 w-72" />
        </div>

        {/* Form skeleton */}
        <div className="rounded-xl border p-5">
          <div className="space-y-4">
            {/* Email */}
            <Skeleton className="h-10 w-full" />

            {/* Password */}
            <Skeleton className="h-10 w-full" />

            {/* Login button */}
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
