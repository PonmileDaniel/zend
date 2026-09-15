import { z } from "zod";

export const loginSchema = z.object({
  emailorAccountNumber: z
    .string()
    .trim()
    .min(1, "Email or account number is required"),

   password: z
    .string()
    .min(8, "Password is required"),
});

export type loginFormData = z.infer<typeof loginSchema>;
