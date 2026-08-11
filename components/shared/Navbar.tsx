"use client"

import { User, Settings, LayoutDashboard, LogOut } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { logOut } from "@/service/logOut"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { IUser } from "@/lib/type"

type NavLink = {
  label: string
  href: string
}

type UserOption = {
  label: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "destructive"
  onClick?: () => void
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Premium", href: "/premium" },
]

// type IUser = {
//   success: boolean
//   statusCode: number
//   message: string
//   data: {
//     id: string
//     name: string
//     email: string
//     phone?: string
//     userStatus: string
//     role: string
//     createdAt: string
//     updatedAt: string
//     technicianProfile?: {
//       id: string
//       profilePhoto: string
//       bio: string | null
//       userId: string
//       createdAt: string
//       updatedAt: string
//     }
//   }
// }
export interface ProfileResponse {
  success: boolean
  statusCode: number
  message: string
  data: IUser
}

export function Navbar({user}:{user:ProfileResponse}) {

 
  console.log("user is ", user);

  const router = useRouter()

  // const handleLogout = async () => {
  //   // const result = await logOut()

  //   if (result.success) {
  //     toast.success(result.message)

  //     router.replace("/login") //because users usually shouldn't be able to press the Back button and return to a protected page in history.
  //     router.refresh() //After deleting the cookies, the current page still has the old server-rendered data.
  //   }
  // }

  const userOptions: UserOption[] = [
    { label: "Profile", href: "/my-profile", icon: User },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Settings", href: "/setting", icon: Settings },
    {
      label: "Log out",
      icon: LogOut,
      variant: "destructive",
      // onClick: handleLogout,
    },
  ]

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          FixIT Now<span className="text-primary">.</span>
        </Link>

        {/* Nav links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink href={link.href}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User dropdown */}
        {user.success ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Open user menu"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-opacity outline-none select-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Avatar className="size-9">
                <AvatarImage src="/diverse-avatars.png" alt="" />
                <AvatarFallback>
                  <User className="size-4 text-primary" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>
                  {user.data.name || "name"}
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  {user.data.email || "demo@gmail.com"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.label}
                    variant={option.variant}
                    onClick={() => {
                      if (option.onClick) {
                        option.onClick()
                      } else if (option.href) {
                        router.push(option.href)
                      }
                    }}
                  >
                    <option.icon className="size-4" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/login"}>
            <Button className="cursor-pointer">Login</Button>
          </Link>
        )}
      </nav>
    </header>
  )
}
