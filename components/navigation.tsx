"use client"

import Link from 'next/link'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  const routes = [
    {
      href: '/test-series',
      label: 'Test Series',
      active: pathname === '/test-series',
    },
    {
      href: '/test/viteee-trial',
      label: 'Take Test',
      active: pathname === '/test/viteee-trial',
    },
    {
      href: '/about',
      label: 'About Us',
      active: pathname === '/about',
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            ACEVITEEE
          </Link>

          <nav className="flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
              >
                <Button 
                  variant="ghost"
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground",
                    route.active && "bg-accent text-accent-foreground"
                  )}
                >
                  {route.label}
                </Button>
              </Link>
            ))}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="default">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}

