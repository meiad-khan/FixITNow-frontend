import React from 'react'
import { User } from '../_config/type'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getRoleBadge, getStatusBadge } from '../_config/util'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {  MoreHorizontal, Search } from 'lucide-react'
import { IUser } from '@/lib/type'
import StatusUpdateButton from './StatusUpdateButton'


export default async function TableBody({users}:{users:IUser[]}) {
   
  
  return (
    <tbody>
      {users.map((user: User) => (
        <tr
          key={user.id}
          className="group border-b transition-colors duration-200 last:border-0 hover:bg-muted/30"
        >
          <td className="px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 border shadow-sm transition-transform duration-300 group-hover:scale-105">
                <AvatarFallback className="bg-linear-to-br from-primary/20 to-violet-500/20 font-semibold text-primary">
                  {user.name.trim().charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="font-medium">{user.name}</p>

                <p className="max-w-55 truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </td>

          <td className="px-4 py-4 text-sm text-muted-foreground">
            {user.phone ?? "Not provided"}
          </td>

          <td className="px-4 py-4">{getRoleBadge(user.role)}</td>

          <td className="px-4 py-4">{getStatusBadge(user.userStatus)}</td>

          <td className="px-4 py-4 text-sm text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </td>

          <td className="px-4 py-4 text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 opacity-70 transition-all group-hover:opacity-100 hover:bg-primary/10 hover:text-primary"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

             {/* user status update button */}
              <StatusUpdateButton user={user} />
              
            </DropdownMenu>
          </td>
        </tr>
      ))}

      {users.length === 0 && (
        <tr>
          <td colSpan={6} className="px-6 py-16 text-center">
            <div className="mx-auto flex max-w-sm flex-col items-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
                <Search className="size-6 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No users found</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                No users are available at the moment.
              </p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  )
}
