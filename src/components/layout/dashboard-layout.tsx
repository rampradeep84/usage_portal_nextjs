"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import AuthCheck from "@/components/auth/AuthCheck"
import { useUser } from "@/contexts/UserContext"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SideNav } from '../nav/side-nav'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useUser()

  if (pathname === "/login") {
    return children
  }

  return (
    <AuthCheck>
      <div className="flex min-h-screen">
        <SideNav />
        <main className="flex-1 pl-64 bg-[#f8fafc]">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthCheck>
  )
}
