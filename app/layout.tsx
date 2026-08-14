import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getProfile } from "@/service/getProfile";
import { Navbar } from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";



export const metadata = {
  title: "FixIt Now",
  desciription:"Book home service from trusted platform"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const user=await getProfile()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        {/* <Navbar user={user}/>  */}
        <ThemeProvider>{children}</ThemeProvider>
        {/* <Footer/> */}
        <Toaster position="top-right"/>
      </body>
    </html>
  )
}
