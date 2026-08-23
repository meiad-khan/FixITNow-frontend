import z from "zod";

export const createCategorySchema = z.object({
  categoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters.")
    .max(50, "Category name cannot exceed 50 characters."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(300, "Description cannot exceed 300 characters."),
})

export type CreateCategoryValues = z.infer<typeof createCategorySchema>
