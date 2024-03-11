import { db } from "@/lib/db"

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordToken.findFirst({
      where: {
        email,
      },
    })

    return passwordToken
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getPasswordTokenBytoken = async (token: string) => {
  try {
    const passwordToken = await db.passwordToken.findUnique({
      where: {
        token,
      },
    })

    return passwordToken
  } catch (e) {
    console.log(e)
    return null
  }
}
