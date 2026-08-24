"use client"

import { Menu, User } from "lucide-react"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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

interface AppNavLink extends NavLink {
  allowedRole?: Array<"CUSTOMER" | "TECHNICIAN" | "ADMIN">
}

const navLinks: AppNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Technician", href: "/technician" },
  {
    label: "Be A Technician",
    href: "/be-a-technician",
    allowedRole: ["TECHNICIAN"],
  },
]

const UserOptionss: Record<string, UserOption[]> = {
  CUSTOMER: customerOptions,
  TECHNICIAN: technicianOptions,
  ADMIN: adminOptions,
}

export function Navbar({ user }: { user: ProfileResponse }) {
  const router = useRouter()
  const pathname = usePathname()
  const userRole = user.data?.role

  const visibleNavLinks = navLinks.filter((link) => {
    if (!link.allowedRole) return true

    return userRole && link.allowedRole.includes(userRole)
  })

  const userOptions = userRole ? UserOptionss[userRole] || [] : []

  const handleAction = async (action: string) => {
    if (action === "logout") {
      await logout()

      toast.success("User Logged Out Successfully")

      router.replace("/login")
      router.refresh()
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

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {visibleNavLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-md transition-colors",
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

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left text-xl text-primary">
                  FixIT Now.
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                {visibleNavLinks.map((link) => {
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-primary/10 font-semibold text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* User */}
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
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>

              <Link href="/register">
                <Button className="cursor-pointer" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
