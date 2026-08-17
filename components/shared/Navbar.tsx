"use client"

import { User } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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
import { usePathname, useRouter } from "next/navigation"
// import { logOut } from "@/service/logOut"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { ProfileResponse } from "@/lib/type"
import { logout } from "@/service/logOut"
import {
  adminOptions,
  customerOptions,
  technicianOptions,
  UserOption,
} from "../utils/options"
import { cn } from "@/lib/utils"

type NavLink = {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  {label:"Technicians", href:"/technician"},
  { label: "About", href: "/about" },
]

export function Navbar({ user }: { user: ProfileResponse }) {
  // console.log("user is ", user);

  const router = useRouter()
  const pathname = usePathname();

  let userOptions: UserOption[] = []

  if (user.data?.role === "CUSTOMER") {
    userOptions = customerOptions
  } else if (user.data?.role === "TECHNICIAN") {
    userOptions = technicianOptions
  } else if (user.data?.role === "ADMIN") {
    userOptions = adminOptions
  }

  const handleAction = async (action: string) => {
    if (action === "logout") {
      await logout()
      toast.success("User Logged Out Successfully")

      router.replace("/login") //because users usually shouldn't be able to press the Back button and return to a protected page in history.
      router.refresh() //After deleting the cookies, the current page still has the old server-rendered data.
    }
  }

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          FixIT Now<span className="text-primary">.</span>
        </Link>

        {/* Nav links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NavigationMenuItem key={link.label}>
                  {/* asChild lets Next.js Link handle client-side routing */}
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-md transition-colors",
                      // Modify active styles here
                      isActive &&
                        "bg-accent font-semibold text-accent-foreground underline decoration-2 underline-offset-4"
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
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
                      if (option.action) {
                        handleAction(option.action)
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
          <div className="space-x-3">
            <Link href={"/login"}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button className="cursor-pointer" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
