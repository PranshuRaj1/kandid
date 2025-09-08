import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/sidebar-wrapper"
import { AppHeader } from "@/components/AppHeader"
import { Providers } from "@/provider"
import ThemeInitializer from "@/components/theme-initialisor"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Linkbird",
  description: "AI",
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeInitializer />
        <LayoutWrapper>
          <div>
            <div className="flex-1 flex flex-col overflow-hidden ">  
              
              <AppHeader />
              <Providers>
                
                {children}
              </Providers>
            </div>
           
          </div>
        </LayoutWrapper>
        
      </body>
    </html>
  )
}
