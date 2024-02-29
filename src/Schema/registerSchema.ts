import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
    role: z.enum(["user", "seller"], {
      errorMap: (issue, ctx) => ({ message: "Please select a role" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
