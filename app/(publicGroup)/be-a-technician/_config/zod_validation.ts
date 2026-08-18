import z from "zod"

export const days = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const

export const dayLabels: Record<(typeof days)[number], string> = {
  saturday: "Saturday",
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
}

export const technicianSchema = z.object({
  profilePhoto: z.string().url("Please enter a valid image URL"),

  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio cannot exceed 500 characters"),

  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(60, "Please enter a valid experience"),

  location: z.string().min(2, "Location is required"),

  availability: z.array(
    z.object({
      day: z.enum(days),
      startTime: z.string().min(1, "Required"),
      endTime: z.string().min(1, "Required"),
    })
  ),
})

export type TechnicianFormValues = z.infer<typeof technicianSchema>