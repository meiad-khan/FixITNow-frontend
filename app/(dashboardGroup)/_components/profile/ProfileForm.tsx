"use client"

import { useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { updateProfile } from "@/app/(dashboardGroup)/_actions/customerDashboard"


interface ProfileData {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  userStatus: string
  createdAt: string
  updatedAt: string
  technicianProfile: unknown | null
}

export default function ProfileForm({ profile }: { profile: ProfileData }) {

  const [name, setName] = useState(profile?.name ?? "")
  const [phone, setPhone] = useState(profile?.phone ?? "")

  const [isPending, startTransition] = useTransition()

  const initials = (profile?.name ?? "?").slice(0, 2).toUpperCase()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set("name", name)
    formData.set("phone", phone)

    startTransition(async () => {
      const result = await updateProfile(formData)

      if (result.success === false) {
        toast.error(result.message ?? "Failed to update profile")
        return
      }

      toast.success("Profile updated successfully")
    })
  }

  const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card className="overflow-hidden border-muted/60">
      <CardHeader className="border-b bg-linear-to-r from-violet-50/80 to-transparent dark:from-violet-500/5">
        <CardTitle className="text-base">Profile</CardTitle>
        <p className="text-xs text-muted-foreground">
          Manage your personal information
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-700 text-lg font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold">{profile.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {profile.role}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-emerald-200 bg-emerald-50 text-xs text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                >
                  {profile.userStatus}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Editable fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Add phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email ?? ""}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Member since {joinedDate}
          </p>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
