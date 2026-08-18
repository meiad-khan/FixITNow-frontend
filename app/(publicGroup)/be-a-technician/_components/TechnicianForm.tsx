"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Plus,
  Trash2,
  Clock3,
  MapPin,
  UserRound,
  BriefcaseBusiness,
  ImageIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { dayLabels, days, TechnicianFormValues, technicianSchema } from "../_config/zod_validation"
import { beATechnician } from "../_actions/becomeTechnicianActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const defaultValues: TechnicianFormValues = {
  profilePhoto: "",
  bio: "",
  experienceYears: 0,
  location: "",
  availability: [
    {
      day: "saturday",
      startTime: "09:00",
      endTime: "18:00",
    },
  ],
}

export default function TechnicianForm() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TechnicianFormValues>({
    resolver: zodResolver(technicianSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  })

  const watchedValues = watch()

  const onSubmit = async (data: TechnicianFormValues) => {
    try {
      setIsSubmitting(true)

      const availability = data.availability.reduce(
        (acc, item) => {
          if (!acc[item.day]) {
            acc[item.day] = []
          }

          acc[item.day].push(`${item.startTime}-${item.endTime}`)

          return acc
        },
        {} as Record<string, string[]>
      )

      const payload = {
        profilePhoto: data.profilePhoto,
        bio: data.bio,
        experienceYears: data.experienceYears,
        location: data.location,
        availability,
      }

      const result = await beATechnician(payload);

    if (result.success) {
      toast.success("Profile created successfully!", {
        description: "You are now registered as a technician.",
      });
      router.replace("/technician-dashboard");
    } else {
      toast.error("Failed to create technician profile", {
        description: result.message || "Something went wrong.",
      });
    }
  } catch (error) {
    console.error(error);

    toast.error("Something went wrong", {
      description: "Please try again later.",
    });
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* Card header */}
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <UserRound className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Professional Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell customers about your experience and when you are available.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 p-6 sm:p-8">
          {/* Profile Photo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-slate-500" />

              <Label htmlFor="profilePhoto">Profile Photo</Label>
            </div>

            <Input
              id="profilePhoto"
              placeholder="https://example.com/images/profile.jpg"
              {...register("profilePhoto")}
            />

            <p className="text-xs text-slate-500">
              Use a publicly accessible image URL.
            </p>

            {errors.profilePhoto && (
              <p className="text-sm text-destructive">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <Label htmlFor="bio">Professional Bio</Label>

            <Textarea
              id="bio"
              rows={5}
              placeholder="Tell customers about your skills, experience and the services you provide..."
              className="resize-none"
              {...register("bio")}
            />

            <div className="flex justify-between">
              <p className="text-xs text-slate-500">
                A good bio helps customers understand your expertise.
              </p>

              <span className="text-xs text-slate-400">
                {watchedValues.bio?.length ?? 0}/500
              </span>
            </div>

            {errors.bio && (
              <p className="text-sm text-destructive">{errors.bio.message}</p>
            )}
          </div>

          {/* Experience + Location */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-slate-500" />

                <Label htmlFor="experienceYears">Experience</Label>
              </div>

              <div className="relative">
                <Input
                  id="experienceYears"
                  type="number"
                  min={0}
                  max={60}
                  className="pr-16"
                  {...register("experienceYears", {
                    valueAsNumber: true,
                  })}
                />

                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-slate-400">
                  years
                </span>
              </div>

              {errors.experienceYears && (
                <p className="text-sm text-destructive">
                  {errors.experienceYears.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />

                <Label htmlFor="location">Location</Label>
              </div>

              <Input
                id="location"
                placeholder="e.g. Sylhet"
                {...register("location")}
              />

              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Availability */}
          <div>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-slate-500" />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Availability
                  </h3>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Set the days and hours when customers can book you.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    day: "saturday",
                    startTime: "09:00",
                    endTime: "18:00",
                  })
                }
              >
                <Plus className="mr-1.5 h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border bg-slate-50/60 p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
                    {/* Day */}
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Day</Label>

                      <select
                        {...register(`availability.${index}.day`)}
                        className="flex h-9 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {dayLabels[day]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Start */}
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">Start</Label>

                      <Input
                        type="time"
                        {...register(`availability.${index}.startTime`)}
                      />
                    </div>

                    {/* End */}
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-500">End</Label>

                      <Input
                        type="time"
                        {...register(`availability.${index}.endTime`)}
                      />
                    </div>

                    {/* Delete */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className="text-slate-400 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50/70 px-6 py-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-md text-xs leading-5 text-slate-500">
              By becoming a technician, your professional profile and
              availability may be visible to customers.
            </p>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Creating Profile..." : "Become a Technician"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
