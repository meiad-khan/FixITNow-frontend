export type UserRole = "ADMIN" | "CUSTOMER"|"TECHNICIAN"
export type UserStatus = "UNBAN" | "BAN" 

export interface User {
  id: string
  name: string
  email: string
  phone: string | null
  role: UserRole
  userStatus: UserStatus
  createdAt: string 
  updatedAt: string 
}

export interface MetaData {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedUserData {
  data: User[]
  meta: MetaData
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}


export type GetUsersResponse = ApiResponse<PaginatedUserData>
