import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Review } from '@/lib/type'
import { Star } from 'lucide-react'
import { AvatarFallback } from 'radix-ui/avatar'
import React from 'react'

export default function TechnicianReviews({ reviews }: { reviews: Review[] }) {
  
   const reviewCount = reviews.length

   const averageRating =
     reviewCount > 0
       ? reviews.reduce(
           (sum: number, review: Review) => sum + review.rating,
           0
         ) / reviewCount
       : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Customer Reviews</CardTitle>

          <div className="flex items-center gap-2">
            <Star className="size-5 fill-current" />

            <span className="font-semibold">
              {averageRating > 0 ? averageRating.toFixed(1) : "No rating"}
            </span>

            <span className="text-sm text-muted-foreground">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review: Review, index: number) => (
            <React.Fragment key={review.id}>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback>
                    {review.booking.user.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{review.booking.user.name}</p>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < review.rating
                                ? "fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              {index !== reviews.length - 1 && <Separator />}
            </React.Fragment>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No reviews yet.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
