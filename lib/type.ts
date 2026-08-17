export interface IAvailability {
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
  role: "TECHNICIAN" | "USER" | "ADMIN"
  userStatus: "UNBAN" | "BANNED"
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

export type Review = {
  id: string
  rating: number
  reviewText: string
  bookingId: string
  createdAt: string
  updatedAt: string
  booking: {
    id: string
    price: string
    scheduledAt: string
    customerNote: string | null
    status: string
    acceptedAt: string | null
    completedAt: string | null
    cancelledAt: string | null
    userId: string
    serviceId: string
    createdAt: string
    updatedAt: string
    user: {
      id: string
      name: string
    }
  }
}

export type CategoryStatus = "AVAILABLE" | "UNAVAILABLE"

export interface Category {
  id: string
  categoryName: string
  description: string
  status: CategoryStatus | string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type GetCategoriesResponse = ApiResponse<Category[]>

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

export interface ServiceUser {
  name: string
}

export interface ServiceTechnician {
  id: string
  user: ServiceUser
}

export interface ServiceDetails {
  serviceName: string
  technician: ServiceTechnician
}

export interface Booking {
  id: string
  price: string
  scheduledAt: string 
  customerNote: string | null
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "DECLINED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
  acceptedAt: string | null
  completedAt: string | null
  cancelledAt: string | null
  userId: string
  serviceId: string
  createdAt: string 
  updatedAt: string 
  service: ServiceDetails
}

export interface BookingResponse {
  success: boolean
  statusCode: number
  message: string
  data: Booking[]
}


export type PaymentProvider = "SSLCOMMERZ"
export type PaymentMethod = "CARD" | "BKASH" | "NAGAD" | "BANK"
export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED"

export interface TechnicianUserInfo {
  name: string
}

export interface TechnicianInfo {
  user: TechnicianUserInfo
}

export interface PaymentServiceInfo {
  serviceName: string
  technician: TechnicianInfo
}

export interface PaymentBookingInfo {
  service: PaymentServiceInfo
}

export interface PaymentRecord {
  id: string
  transactionId: string
  amount: string
  paidAt: string | null
  provider: PaymentProvider | string
  method: PaymentMethod | string
  status: PaymentStatus
  bookingId: string
  createdAt: string
  updatedAt: string
  booking: PaymentBookingInfo
}

export interface PaymentHistoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: PaymentRecord[]
}


