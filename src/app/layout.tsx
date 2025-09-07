import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/sidebar-wrapper"
import { CustomBreadcrumb } from "@/components/breadcrumb-wrapper"

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
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>
          <div>
            <div>
              <CustomBreadcrumb />
              {children}
            </div>
           
          </div>
        </LayoutWrapper>
      </body>
    </html>
  )
}
