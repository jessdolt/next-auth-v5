"use client"
import { newVerification } from "@/actions/new-verification"
import CardWrapper from "@/components/auth/card-wrapper"
import FormError from "@/components/form-error"
import FormSuccess from "@/components/form-success"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"

interface NewVerificationProps {
  searchParams: {
    token: string
  }
}

const NewVerification: React.FC<NewVerificationProps> = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const verifyToken = async (token: string) => {
    if (success || error) return

    try {
      const response = await newVerification(token)

      setSuccess(response.success)
      setError(response.error)
    } catch (e) {
      setError("Something went wrong")
    }
  }

  useEffect(() => {
    if (!token) {
      setError("Missing token")
      return
    }

    verifyToken(token)
  }, [token, success, error])

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Go to login page"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}

export default NewVerification
