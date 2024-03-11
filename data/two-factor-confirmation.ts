import { db } from "@/lib/db"

export const getTwoFactorConfirmationByUserId = async (id: string) => {
  try {
    const twoFactorToken = await db.twoFactorConfirmation.findUnique({
      where: {
        userId: id,
      },
    })

    return twoFactorToken
  } catch (e) {
    console.log(e)
    return null
  }
}
