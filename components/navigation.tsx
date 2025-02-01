"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Test Series", href: "/test-series" },
  { name: "Resources", href: "/resources" },
]

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-background"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-lg">
          ACEVITEEE
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="font-mono text-sm hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="font-mono text-sm hover:text-primary transition-colors">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </motion.header>
  )
}

