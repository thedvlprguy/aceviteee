'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            VITEEE Prep
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/test-series">
              <Button variant="ghost">Test Series</Button>
            </Link>
            <Link href="/resources">
              <Button variant="ghost">Resources</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </div>
      </div>
    </header>
  )
} 