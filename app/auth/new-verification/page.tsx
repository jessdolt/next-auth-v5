"use client"
import { newVerification } from "@/actions/new-verification"
import CardWrapper from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect } from "react"
import { BeatLoader } from "react-spinners"

interface NewVerificationProps {
  searchParams: {
    token: string
  }
}

const NewVerification: React.FC<NewVerificationProps> = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) return

    newVerification(token)
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Go to login page"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  )
}

export default NewVerification
