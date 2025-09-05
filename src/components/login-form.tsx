"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { toast } from "sonner"
import { signIn } from "../../server/user"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Eye, EyeOff } from "lucide-react"
 import { createAuthClient } from "better-auth/client";

interface LoginFormProps {
  onSwitchToRegister: () => void
}

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null) // State to hold error messages

 
const authClient = createAuthClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/"
  });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null) // Reset error on new submission

    try {
      // Await the response from the server action
      const result = await signIn(email, password)

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
          Continue with Google
        </Button>

        <form  className="space-y-4" onSubmit={handleSubmit}>
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