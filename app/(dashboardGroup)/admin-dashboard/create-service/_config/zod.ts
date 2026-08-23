import { z } from "zod"

export const serviceSchema = z.object({
  serviceName: z.string().min(2, "Service name must be at least 2 characters"),

  technicianId: z.string().min(1, "Please select a technician"),

  categoryId: z.string().min(1, "Please select a category"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  basePrice: z.coerce.number().min(1, "Base price must be greater than 0"),
})

// Input type → used by React Hook Form
export type ServiceFormInput = z.input<typeof serviceSchema>

// Output type → validated data after Zod parsing
export type ServiceFormValues = z.output<typeof serviceSchema>
