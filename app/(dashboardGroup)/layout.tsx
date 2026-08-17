import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { Separator } from "@/components/ui/separator"

import type { UserRole } from "@/lib/sidebar-config"
import { AppSidebar } from "./_components/customerDashboard/app-sidebar"
import { getProfile } from "@/service/getProfile"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getProfile()
  // console.log("user ", user);
  const role = (user.data.role) as UserRole
  // console.log("role ", role);
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className="flex w-full flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>

        <div className="flex-1">{children}</div>
      </main>
    </SidebarProvider>
  )
}
