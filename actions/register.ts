"use server"

import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/users"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }

  const { email, password, name } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: "Email already taken" }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  try {
    const t = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
  } catch (e) {
    console.log(e)
  }

  // TODO: Send Verification Token Email

  return { success: "Confirmation email sent" }
}
