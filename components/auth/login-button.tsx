"use client"
import { useRouter } from "next/navigation"
import React from "react"

interface LoginButtonProps {
  children: React.ReactNode
  asChild?: boolean
  mode?: "modal" | "redirect"
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  asChild,
  mode = "redirect",
}) => {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return <span>Todo : Implement modal</span>
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  )
}

export default LoginButton
