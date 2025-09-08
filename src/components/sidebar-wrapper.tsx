"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { useThemeStore } from "@/lib/store/theme-store";
import { useEffect } from "react";
import { usePathname } from 'next/navigation'; 



interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isDark } = useThemeStore();
  
  // Call the hook at the top level of the component.
  const pathname = usePathname();

  
  
  const showSidebar = pathname !== '/login';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 px-2 py-2 border border-rounded-xl">
      
      {showSidebar && <Sidebar />}

      <main className="flex-1 overflow-y-auto overflow-x-hidden p-2">
        {children}
      </main>
    </div>
  );
}