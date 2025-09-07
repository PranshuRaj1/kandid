"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Home,
  Users,
  Megaphone,
  Mail,
  Building2,
  Settings,
  Activity,
  FileText,
  MessageSquare,
  Link,
  Headphones,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useSidebarStore } from "@/lib/store/sidebar-store"
import { useThemeStore } from "@/lib/store/theme-store"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export function Sidebar() {
  const { isOpen } = useSidebarStore()
  const { isDark, toggleTheme } = useThemeStore()
  const router = useRouter()
  const pathname = usePathname()

  const isActiveRoute = (route: string) => {
    if (route === "/dashboard") {
      return pathname === "/" || pathname === "/dashboard"
    }
    return pathname === route
  }

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  return (
    <div
      className={`${isOpen ? "w-64" : "w-0"} h-screen bg-white dark:bg-gray-900 border-r border-gray-200 rounded-xl dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Header */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center">
          <div className="w-full flex items-center justify-start">
            <Image
              src="/linkbird-light-logo.svg"
              alt="LinkBird Logo"
              width={256}
              height={32}
              className="dark:hidden w-full h-auto max-h-10 object-contain"
            />
            <Image
              src="/linkbird-dark-logo.svg"
              alt="LinkBird Logo"
              width={256}
              height={32}
              className="hidden dark:block w-full h-auto max-h-10 object-contain"
            />
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-gray-300 dark:bg-gray-600">
              <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium">
                P
              </AvatarFallback>
            </Avatar>
            <div className="whitespace-nowrap">
              <div className="font-medium text-gray-900 dark:text-white">Kandid</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Personal</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-hidden">
        {/* Overview Section */}
        <div className="p-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 whitespace-nowrap">
            Overview
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActiveRoute("/dashboard")
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("/dashboard")}
            >
              <Home className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Dashboard</span>
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isActiveRoute("/leads")
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => handleNavigation("/leads")}
            >
              <Users className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Leads</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Megaphone className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Campaign</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Messages</span>
              <Badge className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 flex-shrink-0">10+</Badge>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Building2 className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">LinkedIn Accounts</span>
            </Button>
          </nav>
        </div>

        {/* Settings Section */}
        <div className="p-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 whitespace-nowrap">
            Settings
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Settings className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Setting & Billing</span>
            </Button>
          </nav>
        </div>

        {/* Admin Panel Section */}
        <div className="p-3">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 whitespace-nowrap">
            Admin Panel
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Activity className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">Activity logs</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap">User logs</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Headphones className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={`p-2 transition-colors ${isDark ? "text-yellow-500 hover:text-yellow-400" : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"}`}
          >
            <Moon className="w-4 h-4" />
          </Button>
        </div>

        {/* Bottom User Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="w-8 h-8 bg-blue-600 flex-shrink-0">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">BK</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Bhavya From Kandid</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">bhavya@kandid.ai</div>
            </div>
          </div>
          <ChevronUp className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
