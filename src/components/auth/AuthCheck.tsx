"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user && pathname !== "/login") {
      router.push("/login")
    } else if (user && pathname === "/login") {
      router.push("/dashboard")
    }
  }, [pathname, router])

  return <>{children}</>
}
