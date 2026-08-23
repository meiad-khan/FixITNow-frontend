"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createCategorySchema, CreateCategoryValues } from "../_config/zod"
import { createCategory } from "../_actions/create-category"
import { toast } from "sonner"




const CreateCategory = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      categoryName: "",
      description: "",
    },
  })

  const description = watch("description")

  const onSubmit = async (values: CreateCategoryValues) => {
    console.log(values)

    const result = await createCategory(values);
    // console.log("result is ", result);
    if (result.success) {
      toast.success(result.message ||"Category created successfully");
    } else {
      toast.error(result.message||"Something went wrong. Please try again")
    }
    reset()
    setOpen(false)
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)

    if (!value) {
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Category</DialogTitle>

          <DialogDescription>
            Add a new service category to your platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Category Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Category Name
            </label>

            <Input
              id="name"
              placeholder="e.g. Plumbing"
              {...register("categoryName")}
              aria-invalid={!!errors.categoryName}
            />

            {errors.categoryName && (
              <p className="text-sm text-destructive">{errors.categoryName.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>

              <span className="text-xs text-muted-foreground">
                {description?.length ?? 0}/300
              </span>
            </div>

            <Textarea
              id="description"
              placeholder="Write a short description about this category..."
              className="min-h-28 resize-none"
              {...register("description")}
              aria-invalid={!!errors.description}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory
