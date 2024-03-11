"use client"

import { logout } from "@/actions/logout"
import { Button } from "../ui/button"

interface logoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton: React.FC<logoutButtonProps> = ({ children }) => {
  const onClick = () => {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
