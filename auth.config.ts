import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/users"
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials): Promise<any | null> {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password) return

          const verifiedPassword = await bcrypt.compare(password, user.password)

          if (verifiedPassword) return { ...user }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
