import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

interface BackButtonProps {
  label: string
  href: string
}

const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button asChild variant="link" className="font-normal w-full" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
