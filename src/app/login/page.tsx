"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebarStore } from "@/lib/store/sidebar-store"


export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const { isOpen, toggleSidebar } = useSidebarStore()

  return (
    <div className="min-h-screen relative">
      {/* Blur everything behind the card */}
      <div className="absolute top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Menu className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>
      <div className="fixed inset-0 backdrop-blur-md bg-white/40 dark:bg-black/40 z-10" />
      

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
