"use client"

import { ArrowLeft, Home, SearchX } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-lg border-border/60 shadow-sm">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
            <SearchX className="size-8 text-muted-foreground" />
          </div>

          <p className="text-6xl font-bold tracking-tight text-muted-foreground/60">
            404
          </p>

          <CardTitle className="mt-2 text-2xl font-semibold tracking-tight">
            Page not found
          </CardTitle>

          <CardDescription className="mt-2 max-w-md text-sm leading-6">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            may have been removed, renamed, or the URL might be incorrect.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 size-4" />
              Go to homepage
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 size-4" />
            Go back
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
