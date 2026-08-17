export interface Availability {
  monday?: string[]
  tuesday?: string[]
  wednesday?: string[]
  thursday?: string[]
  friday?: string[]
  saturday?: string[]
  sunday?: string[]
}

export interface TechnicianProfileData {
  id: string
  name: string
  email: string
  phone: string | null
  role: string
  userStatus: string
  createdAt: string
  updatedAt: string
  technicianProfile: {
    id: string
    profilePhoto: string
    bio: string
    experienceYears: number
    location: string
    availability: Availability
    userId: string
    createdAt: string
    updatedAt: string
  }
}

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const

export type Day = (typeof DAYS)[number]

export interface DayFormState {
  enabled: boolean
  start: string
  end: string
}

export type AvailabilityFormState = Record<Day, DayFormState>

export function availabilityToFormState(
  availability: Availability
): AvailabilityFormState {
  const state = {} as AvailabilityFormState
  for (const day of DAYS) {
    const range = availability[day]?.[0] // "09:00-17:00"
    if (range) {
      const [start, end] = range.split("-")
      state[day] = { enabled: true, start, end }
    } else {
      state[day] = { enabled: false, start: "09:00", end: "17:00" }
    }
  }
  return state
}

export function formStateToAvailability(
  state: AvailabilityFormState
): Availability {
  const availability: Availability = {}
  for (const day of DAYS) {
    const { enabled, start, end } = state[day]
    if (enabled && start && end) {
      availability[day] = [`${start}-${end}`]
    }
  }
  return availability
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
