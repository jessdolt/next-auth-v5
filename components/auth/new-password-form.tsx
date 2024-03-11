"use client"
import { useState, useTransition } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import CardWrapper from "./card-wrapper"
import { NewPasswordSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  const clearFormState = () => {
    setSuccess("")
    setError("")
  }

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    clearFormState()

    startTransition(async () => {
      try {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve("zxc")
          }, 1000)
        )

        const response = await newPassword(values, token)
        setError(response?.error)

        // TODO: Add when we add 2FA
        setSuccess(response?.success)
      } catch (e) {
        console.log(e)
      }
    })
  }

  return (
    <CardWrapper
      headerLabel="Enter your new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
