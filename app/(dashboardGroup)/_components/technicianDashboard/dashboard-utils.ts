// (dashboardGroup)/_components/technicianDashboard/dashboard-utils.ts
// adjust to your actual path

import { TechnicianBooking } from "@/lib/technician/type";

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(new Date(iso));
}

export function formatTaka(amount: number) {
  return `৳${amount.toLocaleString("en-US")}`;
}

export function getDashboardData(bookings: TechnicianBooking[]) {
  const pendingRequests = bookings
    .filter((b) => b.status === "REQUESTED")
    .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

  const upcomingJobs = bookings
    .filter((b) => b.status === "ACCEPTED")
    // .filter((b) => new Date(b.scheduledAt) >= new Date()) // enable once real data is future-dated
    .sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));

  const totalEarnings = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + Number(b.price), 0);

  return {
    stats: {
      pendingCount: pendingRequests.length,
      upcomingCount: upcomingJobs.length,
      totalEarnings,
    },
    nextThreeJobs: upcomingJobs.slice(0, 3),
    latestRequests: pendingRequests.slice(0, 3),
  };
}

export const statusBadgeVariant = {
  REQUESTED: "outline",
  ACCEPTED: "default",
  DECLINED: "destructive",
  PAID: "secondary",
  IN_PROGRESS: "secondary",
  COMPLETED: "default",
  CANCELLED: "destructive",
} satisfies Record<
  TechnicianBooking["status"],
  "default" | "secondary" | "destructive" | "outline"
>