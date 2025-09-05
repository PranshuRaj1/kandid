"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

import { Sidebar } from "./sidebar"
import { useSidebarStore } from "@/lib/store/sidebar-store"
import { useThemeStore } from "@/lib/store/theme-store"
import { useEffect } from "react"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isOpen, toggleSidebar } = useSidebarStore()
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col relative">
        

        <main className="flex-1 overflow-auto p-6 pt-16">{children}</main>
      </div>
    </div>
  )
}
