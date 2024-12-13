"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, LogOut, LayoutDashboard, BarChart } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { Button } from "@/components/ui/button"

export function SideNav() {
  const pathname = usePathname()
  const { user, logout } = useUser()

  return (
    <div className="flex flex-col fixed h-full w-64 bg-[#1a1f36] text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-semibold">Usage Portal Demo</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                pathname === "/dashboard" 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              )}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/usage"
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                pathname === "/usage" 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              )}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Usage
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t border-gray-800 mt-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-300 hover:text-red-400 hover:bg-gray-800/50 transition-colors"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}
