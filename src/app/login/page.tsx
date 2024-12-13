"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useUser()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "demo" && password === "login") {
      // Store user details in localStorage
      const userDetails = {
        name: "Demo User",
        email: "demo@usageportal.com",
        isLoggedIn: true,
        username: username,
      }
      localStorage.setItem("user", JSON.stringify(userDetails))
      setUser(userDetails) // Update user context immediately
      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Usage Portal Demo</h1>
          <p className="text-gray-600 mt-2">Please login to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Demo credentials: username: demo / password: login
        </div>
      </Card>
    </div>
  )
}
