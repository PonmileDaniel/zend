import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters"),

  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters"),

  phoneNumber: z.string().trim().min(10, "Enter a valid phone number"),

  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address")),

   password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;
