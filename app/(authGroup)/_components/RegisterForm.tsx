"use client"
import { useRouter } from 'next/navigation';
import React, { startTransition, useActionState, useEffect } from 'react'
import { registerAction, RegisterState } from '../_actions/authActions';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '../_config/auth.shcema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';

const RegisterForm = () => {
  const router = useRouter();
  const initialState: RegisterState = {
    success: false,
    statusCode: 0,
    message: "",
  }
  const [state, action, pending] = useActionState(registerAction, initialState);
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "CUSTOMER",
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();

    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("role", data.role)
    if (data.phone) {
      formData.append("phone", data.phone)
    }
    startTransition(() => {
      action(formData)
    })

  }

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      router.push("/login");
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">  
      <Card className="space-y-4 p-5">       
        {/* Name */}
        <div className="space-y-1">         
          <Input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500"> {errors.name.message} </p>
          )}
        </div>
        {/* Email */}
        <div className="space-y-1">        
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500"> {errors.email.message} </p>
          )}
        </div>
        {/* Password */}
        <div className="space-y-1">
          {" "}
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500"> {errors.password.message} </p>
          )}
        </div>
        {/* Phone */}
        <div className="space-y-1">
       
          <Input
            type="text"
            placeholder="Enter your phone (optional)"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500"> {errors.phone.message} </p>
          )}
        </div>
        {/* Role */}
        <div className="space-y-1">         
          <select
            {...register("role")}
            className="w-full rounded-md border px-3 py-2 text-sm"
          >           
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500"> {errors.role.message} </p>
          )}
        </div>
        <Button type="submit" disabled={pending}>
          
          {pending ? <Spinner /> : "Register"}
        </Button>
      </Card>
      <div className="text-center text-sm text-slate-500">
        Already have an account? 
        <Link
          href="/login"
          className="font-medium text-indigo-600 underline underline-offset-4 transition-colors hover:text-indigo-500"
        >
           Log In
        </Link>
      </div>
    </form>
  )
}

export default RegisterForm
