import { getAllCategory } from "@/app/(publicGroup)/_actions/serviceActions/serviceActions"
import CategoryLists from "./_components/CategoryLists"
import CreateCategory from "./_components/CreateCategory"

const CategoryPage = async () => {
  
  const result = await getAllCategory();
  const categories = result?.data ?? []

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>

          <p className="text-sm text-muted-foreground">
            Manage service categories for your platform.
          </p>
        </div>

        <CreateCategory />
      </div>

      <CategoryLists categories={categories} />
    </div>
  )
}

export default CategoryPage
