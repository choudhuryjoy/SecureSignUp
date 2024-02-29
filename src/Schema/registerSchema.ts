import { z } from "zod";

const roleEnum = z.enum(["user", "seller"]);

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
    role: z.enum(["user", "seller"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
