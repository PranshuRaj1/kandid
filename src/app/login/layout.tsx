import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"




const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Linkbird",
  description: "AI",
}



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
     

  
     
                {children}
         
     
        
      </body>
    </html>
  )
}
