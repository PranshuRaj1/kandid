"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Eye, EyeOff } from "lucide-react"
 import { createAuthClient } from "better-auth/client";

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("") // ✅ State for user-friendly errors

 
const authClient = createAuthClient();

const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/"
  });
};

  

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">Continue with an account</CardTitle>
        <p className="text-gray-500 mt-2">You must log in or register to continue.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Button - now calls the correct handler */}
        <Button
        type="button"
          variant="outline"
          className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
          onClick={signInWithGoogle}
          disabled={isLoading}
        >
          {/* ... SVG ... */}
          Continue with Google
        </Button>

        <form  className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {/* Error Message Display */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            <Mail className="w-4 h-4 mr-2" />
            Login with Email
          </Button>
        </form>

        {/* Other elements remain the same */}
        <div className="text-center pt-4">
          <button onClick={onSwitchToRegister} className="text-gray-600 hover:text-gray-800 underline">
            New User? Create New Account
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-600">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-600">
            T&Cs
          </a>
        </p>
      </CardContent>
    </Card>
  )
}