"use client"

import { usePathname } from "next/navigation"
import AuthCheck from "@/components/auth/AuthCheck"
import { useUser } from "@/contexts/UserContext"
import { SideNav } from '../nav/side-nav'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useUser()

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
