import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentails from "next-auth/providers/credentials";

import { loginSchema } from "@/Schema/loginSchema";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentails({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compareSync(
            password,
            user.password
          );
          if(passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
