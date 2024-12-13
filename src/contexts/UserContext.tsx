"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  username: string;
} | null

type UserContextType = {
  user: User
  logout: () => void
  setUser: (user: User) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Check localStorage for user data on component mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Add event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue))
        } else {
          setUser(null)
        }
      }
    }

    // Listen for storage changes across tabs/windows
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
