import { Quote, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    name: "Nusrat Jahan",
    role: "Customer",
    review:
      "Booking a technician was incredibly easy. The technician arrived on time and did a great job.",
  },
  {
    name: "Fahim Rahman",
    role: "Customer",
    review:
      "I needed an urgent plumbing repair and FixIT Now helped me find someone quickly. Great experience.",
  },
  {
    name: "Ayesha Karim",
    role: "Customer",
    review:
      "The pricing was clear and the whole booking process was smooth. I will definitely use it again.",
  },
]

export default function CustomerReviews() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            Customer Stories
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-muted-foreground">
            Real experiences from people who used FixIT Now.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name}>
              <CardContent className="p-6">
                <Quote className="size-8 text-primary/30" />

                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {review.review}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
