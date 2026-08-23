"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  ArrowLeft,
  BriefcaseBusiness,
  CircleDollarSign,
  FileText,
  Layers3,
  Plus,
  UserCog,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { createService } from "../_actions/create-service"

import { Technician } from "@/app/(publicGroup)/_components/technician/technician-card"
import { Category } from "@/lib/type"

import {
  ServiceFormInput,
  ServiceFormValues,
  serviceSchema,
} from "../_config/zod"

type Props = {
  technicians: Technician[]
  categories: Category[]
}

const defaultValues = {
  serviceName: "",
  technicianId: "",
  categoryId: "",
  description: "",
  basePrice: 0,
}

const CreateServiceForm = ({ technicians, categories }: Props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ServiceFormInput, unknown, ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  })

  const technicianId = watch("technicianId")
  const categoryId = watch("categoryId")

  const onSubmit = (values: ServiceFormValues) => {
    startTransition(async () => {
      const result = await createService(values)

      if (!result.success) {
        toast.error(result.message || "Failed to create service")
        return
      }

      toast.success(result.message || "Service created successfully")

      // Empty all form fields after successful creation
      reset(defaultValues)

      router.refresh()
    })
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-8">
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <BriefcaseBusiness className="size-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Create New Service
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Add a service, assign a technician, and organize it under a
                category.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => router.push("/service")}
          >
            <ArrowLeft className="mr-2 size-4" />
            View Services
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Service Details */}
          <div className="border-b p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">Service Details</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the basic information about the service.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Service Name */}
              <div className="space-y-2">
                <label htmlFor="serviceName" className="text-sm font-medium">
                  Service Name
                </label>

                <Input
                  id="serviceName"
                  placeholder="e.g. Faucet Installation & Repair"
                  {...register("serviceName")}
                />

                {errors.serviceName && (
                  <p className="text-sm text-destructive">
                    {errors.serviceName.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>

                <Textarea
                  id="description"
                  placeholder="Write a clear description about this service..."
                  className="min-h-36 resize-none"
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Assignment & Pricing */}
          <div className="border-b bg-muted/20 p-5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers3 className="size-5" />
              </div>

              <div>
                <h2 className="font-semibold">Assignment & Pricing</h2>
                <p className="text-sm text-muted-foreground">
                  Select who will provide this service and set the base price.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Technician */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <UserCog className="size-4 text-muted-foreground" />
                  Technician
                </label>

                <Select
                  value={technicianId}
                  onValueChange={(value) =>
                    setValue("technicianId", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select a technician" />
                  </SelectTrigger>

                  <SelectContent>
                    {technicians.map((technician) => (
                      <SelectItem key={technician.id} value={technician.id}>
                        {technician.user?.name || "Unknown Technician"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.technicianId && (
                  <p className="text-sm text-destructive">
                    {errors.technicianId.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Layers3 className="size-4 text-muted-foreground" />
                  Category
                </label>

                <Select
                  value={categoryId}
                  onValueChange={(value) =>
                    setValue("categoryId", value, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Base Price */}
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="basePrice"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <CircleDollarSign className="size-4 text-muted-foreground" />
                  Base Price
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                    ৳
                  </span>

                  <Input
                    id="basePrice"
                    type="number"
                    min={1}
                    placeholder="2999"
                    className="pl-8"
                    {...register("basePrice")}
                  />
                </div>

                {errors.basePrice && (
                  <p className="text-sm text-destructive">
                    {errors.basePrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-center text-xs text-muted-foreground sm:text-left">
              Make sure all service information is correct before creating it.
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => router.push("/services")}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex-1 sm:flex-none"
                disabled={isPending}
              >
                <Plus className="mr-2 size-4" />

                {isPending ? "Creating..." : "Create Service"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateServiceForm
