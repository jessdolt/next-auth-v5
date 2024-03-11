"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/users"
import { NewPasswordSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getPasswordTokenBytoken } from "@/data/reset-password-token"

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing token" }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const existingToken = await getPasswordTokenBytoken(token)

  if (!existingToken) {
    return { error: "Token does not exist!" }
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date()

  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email does not exist" }
  }

  const { password } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: "Reset password successfully" }
}
