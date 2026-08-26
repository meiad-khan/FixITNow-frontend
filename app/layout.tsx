
import { Toaster } from "sonner"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"


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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* <Footer/> */}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
