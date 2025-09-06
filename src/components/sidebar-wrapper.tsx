"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { useThemeStore } from "@/lib/store/theme-store"
import { useEffect } from "react"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  
  const { isDark } = useThemeStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 px-2 py-2 border border-rounded-xl">
      
      <Sidebar />

      
        

        <main className="flex-1 overflow-auto p-2 ">{children}</main>

    </div>
  )
}
