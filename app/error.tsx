"use client"

import { useEffect } from "react"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-lg border-border/60 shadow-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-8 text-destructive" />
          </div>

          <CardTitle className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </CardTitle>

          <CardDescription className="mt-2 max-w-md text-sm leading-6">
            We couldn&apos;t complete your request. Please try again, or return
            to the homepage if the problem continues.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error.digest && (
            <div className="rounded-lg border bg-muted/50 px-4 py-3 text-center">
              <p className="text-xs text-muted-foreground">Error reference</p>
              <p className="mt-1 font-mono text-xs text-foreground">
                {error.digest}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>

          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go to homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
