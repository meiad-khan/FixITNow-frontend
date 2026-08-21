"use client"
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Ban, CheckCircle2 } from 'lucide-react'
import React from 'react'
import { User } from '../_config/type'
import { updateUserStatus } from '../_actions/updateStatus'
import { toast } from 'sonner'

export default function StatusUpdateButton({user}:{user:User}) {

  // console.log("user is ", user);

  const handleUpdateStatus = async (value:string) => {
    if (value) {
      const result = await updateUserStatus(user.id, value);
      if (result.success) {
        if (value === "BAN") {
          toast.success("User is Banned")
        } else {
          toast.success("User is Unbanned")
        }
      } else {
        toast.error(result.message||"Something went wrong")
      }
    }
  }


  return (
    <DropdownMenuContent align="end">
      {user.userStatus === "UNBAN" ? (
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onSelect={() => handleUpdateStatus("BAN")}
        >
          <Ban className="mr-2 size-4" />
          Ban User
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          className="text-emerald-600 focus:text-emerald-600"
          onSelect={() => handleUpdateStatus("UNBAN")}
        >
          <CheckCircle2 className="mr-2 size-4" />
          Unban User
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  )
}
