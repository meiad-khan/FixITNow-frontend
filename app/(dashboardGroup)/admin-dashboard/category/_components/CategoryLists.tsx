import { BriefcaseBusiness, FolderTree} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Category } from "@/lib/type"
import CategoryStats from "./CategoryStats"


const CategoryLists = ({ categories }: { categories :Category[]}) => {
  
 
  return (
    <div className="space-y-6">

     <CategoryStats categories={categories}/>

      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Service Categories
          </h2>

          <p className="text-sm text-muted-foreground">
            View and manage all available service categories.
          </p>
        </div>

        {/* Empty State */}
        {categories.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <FolderTree className="size-6 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No categories found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                There are no service categories yet. Create your first category
                to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="p-5">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FolderTree className="size-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {category.categoryName}
                        </h3>

                        <Badge
                          variant={
                            category.status === "AVAILABLE"
                              ? "default"
                              : "secondary"
                          }
                          className="mt-1"
                        >
                          {category.status === "AVAILABLE"
                            ? "Available"
                            : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                    {category.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BriefcaseBusiness className="size-4" />

                      <span>
                        {category._count.services}{" "}
                        {category._count.services === 1
                          ? "Service"
                          : "Services"}
                      </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {new Date(category.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryLists
