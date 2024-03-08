"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

import { registerSchema } from "@/Schema/registerSchema";
import { getUserByEmail } from "../data/user";

export const registerForm = async (values: z.infer<typeof registerSchema>) => {
  console.log(values);
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = values;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);

  const isUser = await getUserByEmail(email);

  if (isUser) {
    return { error: "Email alreday in use" };
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hash,
    },
  });

  // send verification token email

  return { success: "Email sent!" };
};
