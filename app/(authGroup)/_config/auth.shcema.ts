import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z.string().min(4,"Password is required")
})

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .optional(),
  role: z.enum(["TECHNICIAN", "CUSTOMER"]),
})

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
