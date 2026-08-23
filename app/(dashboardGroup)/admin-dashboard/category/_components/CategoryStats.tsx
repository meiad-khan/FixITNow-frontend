import { Card, CardContent } from '@/components/ui/card'
import { Category } from '@/lib/type'
import { BriefcaseBusiness, FolderTree, Layers3, Package } from 'lucide-react'
import React from 'react'

export default function CategoryStats({ categories }: { categories: Category[] }) {
  
   const totalCategories = categories.length

   const totalServices = categories.reduce(
     (total, category) => total + category._count.services,
     0
   )

   const averageServices =
     totalCategories > 0 ? Math.floor(totalServices / totalCategories) : "0.00"

   const activeCategories = categories.filter(
     (category) => category.status === "AVAILABLE"
   ).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Categories */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Categories
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {totalCategories}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              All service categories
            </p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
            <FolderTree className="size-5 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Total Services */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Services
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {totalServices}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Across all categories
            </p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-lg bg-blue-500/10">
            <Package className="size-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Average Services */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Avg. Services
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {averageServices}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Services per category
            </p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-lg bg-orange-500/10">
            <Layers3 className="size-5 text-orange-500" />
          </div>
        </CardContent>
      </Card>

      {/* Active Categories */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Active Categories
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight">
              {activeCategories}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Currently available
            </p>
          </div>

          <div className="flex size-11 items-center justify-center rounded-lg bg-green-500/10">
            <BriefcaseBusiness className="size-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
