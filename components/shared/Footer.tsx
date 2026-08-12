import Link from "next/link"
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const serviceLinks = [
  { label: "Plumbing", href: "/service" },
  { label: "Electrical", href: "/service" },
  { label: "AC Repair", href: "/service" },
  { label: "Cleaning", href: "/service" },
  { label: "Appliance Repair", href: "/service" },
]

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Technicians", href: "/technician" },
  { label: "About Us", href: "/about" },
]

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Help Center", href: "/help" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-primary"
            >
              FixIT Now<span>.</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Your trusted home service marketplace. Find skilled professionals,
              book your service, and get the job done with confidence.
            </p>

            {/* Contact information */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>support@fixitnow.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+880 1XXX-XXXXXX</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Services</h3>

            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>

            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FixIT Now. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <Link
              href="#"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaFacebookF className="size-4" />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaInstagram className="size-4" />
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <FaLinkedinIn className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
