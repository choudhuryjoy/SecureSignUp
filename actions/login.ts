"use server";

import * as z from "zod";
import { loginSchema } from "@/Schema/loginSchema";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Email sent!" };
};
