import { ClerkProvider } from "@clerk/nextjs"
import { Inter, Playfair_Display, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"
import { Navigation } from "@/components/navigation"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "ACEVITEEE - VITEEE Preparation Platform",
  description: "Free VITEEE preparation platform with mock tests and resources",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} ${ibmPlexMono.variable} font-sans`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navigation />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

