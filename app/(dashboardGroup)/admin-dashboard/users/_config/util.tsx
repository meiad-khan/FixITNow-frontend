import { Badge } from "@/components/ui/badge"
import { IUser } from "@/lib/type"
import { Ban, CheckCircle2, ShieldCheck, UserCheck, Wrench } from "lucide-react"

  
  export const getRoleBadge = (role: IUser["role"]) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge className="border-0 bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/50 dark:text-violet-400">
            <ShieldCheck className="mr-1 size-3" />
            Admin
          </Badge>
        )

      case "TECHNICIAN":
        return (
          <Badge className="border-0 bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400">
            <Wrench className="mr-1 size-3" />
            Technician
          </Badge>
        )

      default:
        return (
          <Badge className="border-0 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400">
            <UserCheck className="mr-1 size-3" />
            Customer
          </Badge>
        )
    }
  }

  export const getStatusBadge = (status: IUser["userStatus"]) => {
    if (status === "BAN") {
      return (
        <Badge className="border-0 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400">
          <Ban className="mr-1 size-3" />
          Banned
        </Badge>
      )
    }

    return (
      <Badge className="border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400">
        <CheckCircle2 className="mr-1 size-3" />
        Active
      </Badge>
    )
  }
