"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { startTransition, useActionState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "../_config/auth.shcema"
import { Spinner } from "@/components/ui/spinner"
import { loginAction, LoginState } from "../_actions/authActions"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get("redirectTo")

  const initialState: LoginState = {
    success: false,
    statusCode: 0,
    message: "",
    data: {
      accessToken: "",
      refreshToken: "",
    },
  }

  const [state, action, pending] = useActionState(loginAction, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData()

    formData.append("email", data.email)
    formData.append("password", data.password)

    startTransition(() => {
      action(formData)
    })
  }

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)

      // 1. Redirect user back to previous page

      if (redirectTo) {
        router.push(redirectTo)
        return
      }

      // 2. Otherwise use role-based dashboard
   
      if (state.role === "CUSTOMER") {
        router.push("/dashboard")
      } else if (state.role === "TECHNICIAN") {
        router.push("/technician-dashboard")
      } else if (state.role === "ADMIN") {
        router.push("/admin-dashboard")
      }
    } else {
      toast.error(state.message)
    }
  }, [state, router, redirectTo])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="space-y-2 p-5">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? <Spinner /> : "Login"}
        </Button>
      </Card>

      <div className="text-center text-sm text-slate-500">
        New to FixIT?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-500"
        >
          Create an account
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
