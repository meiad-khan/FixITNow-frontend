import { MetaData } from "@/app/(dashboardGroup)/admin-dashboard/users/_config/type"

export type ServiceResponse = {
  success: boolean
  statusCode: number
  message: string
  data: Service[]
  meta: MetaData
}
export interface Service {
  id: string
  serviceName: string
  description: string
  basePrice: string
  status: string
  category: {
    categoryName: string
  }
  technician: {
    user: {
      name: string
    }
  }
}