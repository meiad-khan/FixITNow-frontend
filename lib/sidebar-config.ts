import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  User,
  BriefcaseBusiness,
  ClipboardList,
  Users,
  Tags,
  Wrench,
  PackagePlus,
  type LucideIcon,
} from "lucide-react"

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN"

export interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
}

export const sidebarItems: Record<UserRole, SidebarItem[]> = {
  
  CUSTOMER: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Bookings", href: "/dashboard/bookings", icon: Wrench },
    { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { title: "My Profile", href: "/dashboard/profile", icon: User },
  ],
  TECHNICIAN: [
    {
      title: "Dashboard",
      href: "/technician-dashboard",
      icon: LayoutDashboard,
    },
    { title: "My Profile", href: "/technician/profile", icon: User },
    {
      title: "My Services",
      href: "/technician/services",
      icon: BriefcaseBusiness,
    },
    {
      title: "Availability",
      href: "/technician/availability",
      icon: CalendarDays,
    },
    { title: "Bookings", href: "/technician/bookings", icon: ClipboardList },
  ],
  ADMIN: [
    { title: "Dashboard", href: "/admin-dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/admin-dashboard/admin/users", icon: Users },
    {
      title: "Categories",
      href: "/admin-dashboard/admin/categories",
      icon: Tags,
    },
    {
      title: "Create Services",
      href: "/admin-dashboard/admin/services",
      icon: PackagePlus,
    },
  ],
}
