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
import { ResetPasswordSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { reset } from "@/actions/reset"

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const clearFormState = () => {
    setSuccess("")
    setError("")
  }

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    clearFormState()

    startTransition(async () => {
      try {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve("zxc")
          }, 1000)
        )

        const response = await reset(values)
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
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
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
            Forgot password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
