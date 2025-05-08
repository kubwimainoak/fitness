"use client"

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock user credentials
const MOCK_USER = {
  email: "demo@example.com",
  password: "demo123"
}

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check credentials
    if (formData.email === MOCK_USER.email && formData.password === MOCK_USER.password) {
      // In a real app, you would set a session/token here
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#1E3A8A]/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-8 w-8 text-[#1E3A8A]" />
            <h1 className="text-2xl font-bold text-[#1E3A8A] ml-2">Universal Gym</h1>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <div className="text-sm text-center text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1E3A8A] hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-xs text-center text-gray-400 mt-2">
            Demo credentials: demo@example.com / demo123
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
