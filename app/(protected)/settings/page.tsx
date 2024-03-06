import { auth, signOut } from "@/auth"
import React from "react"

const SettingsPage = async () => {
  const session = await auth()
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server"

          await signOut()
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  )
}

export default SettingsPage
