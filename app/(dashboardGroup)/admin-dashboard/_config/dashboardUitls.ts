import { Booking, IUser } from "@/lib/type"
import { getAllBookings, getAllUsers, getUsersStats } from "../../_actions/adminDashboard"
import {
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  UserCheck,
  Users,
  Wrench,
  XCircle,
} from "lucide-react"

const [userStatsResponse, bookingResponse] = await Promise.all([
  getUsersStats(),
  getAllBookings(),
])

const users = userStatsResponse.data.stats ?? {}
const bookings = bookingResponse.data ?? []

// -----------------------------
// User Statistics
// -----------------------------

export const totalUsers = users.totalUsers

export const totalCustomers = users.totalCustomer

export const totalTechnicians = users.totalTechnician

export const totalAdmins = users.totalAdmin

// Booking Statistics

export const totalBookings = bookings.length

const activeStatuses = ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"]

export const activeBookings = bookings.filter((booking: Booking) =>
  activeStatuses.includes(booking.status)
).length

export const completedBookings = bookings.filter(
  (booking: Booking) => booking.status === "COMPLETED"
).length

const requestedBookings = bookings.filter(
  (booking: Booking) => booking.status === "REQUESTED"
).length

const acceptedBookings = bookings.filter(
  (booking: Booking) => booking.status === "ACCEPTED"
).length

const paidBookings = bookings.filter(
  (booking: Booking) => booking.status === "PAID"
).length

const inProgressBookings = bookings.filter(
  (booking: Booking) => booking.status === "IN_PROGRESS"
).length

const cancelledBookings = bookings.filter(
  (booking: Booking) => booking.status === "CANCELLED"
).length

// -----------------------------
// Revenue
// -----------------------------

export const totalRevenue = bookings
  .filter((booking: Booking) => booking.status === "COMPLETED")
  .reduce((total: number, booking: Booking) => {
    return total + Number(booking.price)
  }, 0)

// -----------------------------
// Recent Users
// -----------------------------

// export const recentUsers = [...users]
//   .sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   )
//   .slice(0, 5)

// -----------------------------
// Dashboard Stats
// -----------------------------

export const stats = [
  {
    title: "Total Users",
    value: totalUsers,
    description: "Registered users",
    icon: Users,
    iconClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    badgeClass:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    title: "Technicians",
    value: totalTechnicians,
    description: "Service providers",
    icon: Wrench,
    iconClass:
      "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    badgeClass:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  },
  {
    title: "Customers",
    value: totalCustomers,
    description: "Platform customers",
    icon: UserCheck,
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
    badgeClass:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  },
  {
    title: "Active Bookings",
    value: activeBookings,
    description: "Currently active",
    icon: CalendarCheck,
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    badgeClass:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    title: "Completed",
    value: completedBookings,
    description: "Completed bookings",
    icon: CheckCircle2,
    iconClass:
      "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    badgeClass:
      "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400",
  },
  {
    title: "Revenue",
    value: `৳${totalRevenue.toLocaleString()}`,
    description: "From completed bookings",
    icon: CircleDollarSign,
    iconClass:
      "bg-pink-100 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400",
    badgeClass:
      "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400",
  },
]


// Booking Overview

export const bookingStats = [
  {
    title: "Requested",
    value: requestedBookings,
    icon: Clock3,
    iconClass:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    valueClass: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Accepted",
    value: acceptedBookings,
    icon: CalendarCheck,
    iconClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    valueClass: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Paid",
    value: paidBookings,
    icon: CreditCard,
    iconClass:
      "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
    valueClass: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "In Progress",
    value: inProgressBookings,
    icon: Clock3,
    iconClass:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    valueClass: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Completed",
    value: completedBookings,
    icon: CheckCircle2,
    iconClass:
      "bg-green-100 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    valueClass: "text-green-600 dark:text-green-400",
  },
  {
    title: "Cancelled",
    value: cancelledBookings,
    icon: XCircle,
    iconClass: "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    valueClass: "text-red-600 dark:text-red-400",
  },
]
