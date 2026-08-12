import { LayoutDashboard, LogOut, User } from "lucide-react"

export type UserOption = {
  label: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "destructive"
  action?: string
}

export const customerOptions: UserOption[] = [
  { label: "Profile", href: "/dashboard/my-profile", icon: User },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Log Out", variant:"destructive", icon: LogOut, action:"logout"}
]
export const technicianOptions: UserOption[] = [
  { label: "Profile", href: "/my-profile", icon: User },
  { label: "Dashboard", href: "/technician-dashboard", icon: LayoutDashboard },
  { label: "Log Out", variant: "destructive", icon: LogOut, action: "logout" },
]
export const adminOptions: UserOption[] = [
  { label: "Profile", href: "/my-profile", icon: User },
  { label: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
  { label: "Log Out", variant: "destructive", icon: LogOut, action: "logout" },
]