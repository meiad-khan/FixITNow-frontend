"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  Pencil,
  X,
  Save,
  MapPin,
  Briefcase,
  Mail,
  Phone,
  Image as ImageIcon,
} from "lucide-react"
import {
  DAYS,
  capitalize,
  availabilityToFormState,
  formStateToAvailability,
  type AvailabilityFormState,
  type TechnicianProfileData,
} from "./profile-utils"
import { updateTechnicianProfile } from "../../_actions/update-profile"

interface TechnicianProfileFormProps {
  profile: TechnicianProfileData
}

export function TechnicianProfileForm({ profile }: TechnicianProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone ?? "")
  const [bio, setBio] = useState(profile.technicianProfile.bio)
  const [location, setLocation] = useState(profile.technicianProfile.location)
  const [experienceYears, setExperienceYears] = useState(
    profile.technicianProfile.experienceYears
  )
  const [profilePhoto, setProfilePhoto] = useState(
    profile.technicianProfile.profilePhoto
  )
  const [availability, setAvailability] = useState<AvailabilityFormState>(
    availabilityToFormState(profile.technicianProfile.availability)
  )

  function resetForm() {
    setName(profile.name)
    setPhone(profile.phone ?? "")
    setBio(profile.technicianProfile.bio)
    setLocation(profile.technicianProfile.location)
    setExperienceYears(profile.technicianProfile.experienceYears)
    setProfilePhoto(profile.technicianProfile.profilePhoto)
    setAvailability(
      availabilityToFormState(profile.technicianProfile.availability)
    )
  }

  function handleCancel() {
    resetForm()
    setIsEditing(false)
  }

  function toggleDay(day: (typeof DAYS)[number]) {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }))
  }

  function updateDayTime(
    day: (typeof DAYS)[number],
    field: "start" | "end",
    value: string
  ) {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }


  function handleSave() {
    startTransition(async () => {
      try {
        await updateTechnicianProfile({
          name,
          phone: phone || null,
          bio,
          location,
          experienceYears: Number(experienceYears),
          profilePhoto,
          availability: formStateToAvailability(availability),
        })
        toast.success("Profile updated")
        setIsEditing(false)
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update profile"
        )
      }
    })
  }

  
  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
        <div className="pointer-events-none absolute -top-14 -right-10 h-40 w-40 rounded-full bg-violet-100/60 blur-2xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profilePhoto || "/placeholder-avatar.png"}
              alt={name}
              className="h-20 w-20 rounded-2xl border object-cover"
            />
            <div>
              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border px-3 py-1.5 font-serif text-xl font-bold"
                />
              ) : (
                <h1 className="font-serif text-2xl font-bold">{name}</h1>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
                  <Briefcase className="h-3.5 w-3.5" />
                  {profile.role}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {isEditing ? (
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="rounded-md border px-2 py-0.5 text-sm"
                    />
                  ) : (
                    location
                  )}
                </span>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 self-start rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 sm:self-center"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2 self-start sm:self-center">
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isPending ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: bio, contact, photo url */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-semibold">Contact</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-md border px-2 py-1 text-sm"
                  />
                ) : (
                  <span>{phone || "Not provided"}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="number"
                    min={0}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-20 rounded-md border px-2 py-1 text-sm"
                  />
                ) : (
                  <span>{experienceYears} years experience</span>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold">
                <ImageIcon className="h-4 w-4" />
                Profile Photo URL
              </h2>
              <input
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          )}

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-3 font-serif text-lg font-semibold">Bio</h2>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-sm text-muted-foreground">{bio}</p>
            )}
          </div>
        </div>

        {/* Right column: availability */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg font-semibold">
              Weekly Availability
            </h2>
            <div className="space-y-2">
              {DAYS.map((day) => {
                const dayState = availability[day]
                return (
                  <div
                    key={day}
                    className={`flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between ${
                      dayState.enabled
                        ? "border-violet-200 bg-violet-50/40"
                        : "bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={dayState.enabled}
                          onChange={() => toggleDay(day)}
                          className="h-4 w-4 accent-violet-600"
                        />
                      ) : (
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            dayState.enabled
                              ? "bg-violet-500"
                              : "bg-muted-foreground/30"
                          }`}
                        />
                      )}
                      <span className="w-24 font-medium">
                        {capitalize(day)}
                      </span>
                    </div>

                    {dayState.enabled ? (
                      isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={dayState.start}
                            onChange={(e) =>
                              updateDayTime(day, "start", e.target.value)
                            }
                            className="rounded-md border px-2 py-1 text-sm"
                          />
                          <span className="text-muted-foreground">to</span>
                          <input
                            type="time"
                            value={dayState.end}
                            onChange={(e) =>
                              updateDayTime(day, "end", e.target.value)
                            }
                            className="rounded-md border px-2 py-1 text-sm"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {dayState.start} – {dayState.end}
                        </span>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Unavailable
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
