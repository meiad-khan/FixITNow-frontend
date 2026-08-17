export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

export interface User {
  name: string
}

export interface Technician {
  user: User
}

export interface Service {
  serviceName: string
  technician: Technician
}

export interface TechnicianBooking {
  id: string
  price: string
  scheduledAt: string
  customerNote: string | null
  status: BookingStatus
  acceptedAt: string | null
  completedAt: string | null
  cancelledAt: string | null
  userId: string
  serviceId: string
  createdAt: string
  updatedAt: string
  service: Service
  user: User
}

export interface ApiResponse<T = TechnicianBooking[]> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export type BookingsResponse = ApiResponse<TechnicianBooking[]>
