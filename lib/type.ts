interface IAvailability {
  monday?: string[]
  tuesday?: string[]
  wednesday?: string[]
  thursday?: string[]
  friday?: string[]
  saturday?: string[]
  sunday?: string[]
}

export interface TechnicianProfile {
  id: string
  profilePhoto: string
  bio: string
  experienceYears: number
  location: string
  availability: IAvailability
  userId: string
  createdAt: string
  updatedAt: string
}

export interface IUser {
  id: string
  name: string
  email: string
  phone: string | null
  role: string // : "TECHNICIAN" | "USER" | "ADMIN"
  userStatus: string //  literal union like: "UNBAN" | "BANNED"
  createdAt: string
  updatedAt: string
  technicianProfile: TechnicianProfile
}

export interface ProfileResponse {
  success: boolean
  statusCode: number
  message: string
  data: IUser
}