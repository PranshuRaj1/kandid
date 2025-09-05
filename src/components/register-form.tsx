"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { signUp } from "../../server/user" // Your server action

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State to hold error messages

  // Unified handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null) // Reset error on new submission

    try {
      // Await the response from the server action
      const result = await signUp(email, password, `${firstName} ${lastName}`.trim())

      if (result.success) {
        // On success, redirect to the home page
        window.location.href = "/"
      } else {
        // On failure, set the error message to display to the user
        setError(result.message)
      }
    } catch (err) {
      // Catch any unexpected network or server errors
      setError("An unexpected error occurred. Please try again.")
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="pb-6">
        <div className="flex items-center mb-4">
          <button onClick={onSwitchToLogin} className="flex items-center text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-900">Register with email</CardTitle>
        <p className="text-gray-500 mt-2">Register using your email address.</p>
      </CardHeader>
      <CardContent>
        {/* Use the new handleSubmit function */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display error message if it exists */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* This button correctly triggers the form's onSubmit */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white mt-6"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create my account"}
          </Button>
        </form>

        <div className="text-center pt-6">
          <span className="text-gray-600">Already have an account? </span>
          <button onClick={onSwitchToLogin} className="text-gray-800 hover:text-gray-600 underline">
            Login
          </button>
        </div>
      </CardContent>
    </Card>
  )
}