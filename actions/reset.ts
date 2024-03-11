"use server"
import { getUserByEmail } from "@/data/users"
import { sendResetPasswordEmail } from "@/lib/mail"
import { generatePasswordToken } from "@/lib/tokens"
import { ResetPasswordSchema } from "@/schemas"
import * as z from "zod"

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid Field" }
  }

  const { email } = validatedFields.data

  //   send token to user

  const user = await getUserByEmail(email)

  if (!user || !user.email) {
    return { error: "Email doesn't exist" }
  }

  const passwordToken = await generatePasswordToken(user.email)

  if (passwordToken) {
    await sendResetPasswordEmail(passwordToken.email, passwordToken.token)
  }

  return { success: "Reset password sent on your email" }
}
