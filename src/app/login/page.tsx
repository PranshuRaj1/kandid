"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebarStore } from "@/lib/store/sidebar-store"


export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
 

  return (
    <div className="min-h-screen relative">
      {/* Blur everything behind the card */}
      
      

      {/* Card */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {isRegistering ? (
            <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
          ) : (
            <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
          )}
        </div>
      </div>
    </div>
  )
}
