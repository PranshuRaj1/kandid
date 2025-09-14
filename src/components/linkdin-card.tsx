"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import  { useState, useEffect ,memo} from "react"

// 1. Define a type for the account object for TypeScript
type LinkedInAccount = {
  id: number
  name: string
  email: string
  avatar: string
  status: string
  requests: {
    current: number
    total: number
  }
}

// Mock LinkedIn accounts data
const mockLinkedInAccounts: LinkedInAccount[] = [
  {
    id: 1,
    name: "Pulkit Garg",
    email: "1999pulkitgarg@gmail.com",
    avatar: "/professional-man-headshot-blue-shirt.jpg",
    status: "Connected",
    requests: { current: 17, total: 30 },
  },
  {
    id: 2,
    name: "Jivesh Lakhani",
    email: "jivesh@gmail.com",
    avatar: "/professional-man-headshot-blue-shirt.jpg",
    status: "Connected",
    requests: { current: 19, total: 30 },
  },
  {
    id: 3,
    name: "Indrajit Sahani",
    email: "indrajit38mig@gmail.com",
    avatar: "/professional-man-headshot-blue-shirt.jpg",
    status: "Connected",
    requests: { current: 18, total: 30 },
  },
  {
    id: 4,
    name: "Bhavya Arora",
    email: "bhavyaarora199.ba@gmail.c...",
    avatar: "/professional-woman-headshot-business.png",
    status: "Connected",
    requests: { current: 18, total: 100 },
  },
  {
    id: 5,
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "/professional-man-headshot-beard.png",
    status: "Connected",
    requests: { current: 50, total: 100 },
  },
  {
    id: 6,
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    avatar: "/professional-woman-headshot-business.png",
    status: "Connected",
    requests: { current: 25, total: 30 },
  },
]

function LinkedInAccountSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-3 gap-4 pb-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 items-center py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="flex items-center justify-end gap-3">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const LinkedInAccountsComponent = memo(function LinkedInAccountsComponent() {
  // Initialize isLoading to true and create a state for the accounts
  const [isLoading, setIsLoading] = useState(true)
  const [accounts, setAccounts] = useState<LinkedInAccount[]>([])

  // Use useEffect to simulate fetching data when the component mounts because currently there is no API
  useEffect(() => {
    const timer = setTimeout(() => {
      setAccounts(mockLinkedInAccounts) // Load data into state
      setIsLoading(false) // <-- This is where setIsLoading is now used
    }, 1000) // Simulate a 1-second delay

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer)
  }, []) // Empty array ensures this runs only once

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-full">
        <LinkedInAccountSkeleton />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6  flex flex-col">
      {/* Header */}
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">LinkedIn Accounts</h2>

      {/* Table headers */}
      <div className="grid grid-cols-3 gap-4 pb-4 mb-4 text-xs border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div className=" font-medium text-gray-500 dark:text-gray-400">Account</div>
        <div className=" font-medium text-gray-500 dark:text-gray-400 text-center px-25">Status</div>
        <div className=" font-medium text-gray-500 dark:text-gray-400 text-right">Requests</div>
      </div>

      {/* Account list */}
      <div className="overflow-y-auto max-h-[16.75rem]">
        <div className="space-y-1">
          {/* 4. Map over the 'accounts' state variable */}
          {accounts.map((account) => (
            <div key={account.id} className="grid grid-cols-3 gap-4 text-xs items-center py-3">
              {/* Account info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {account.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{account.name}</span>
                    <div className="w-4 h-4 bg-orange-400 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{account.email}</div>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-center text-xs px-30">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  </div>
                  Connected
                </div>
              </div>

              {/* Requests progress */}
              <div className="flex items-center justify-end gap-3">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(account.requests.current / account.requests.total) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[40px] text-right">
                  {account.requests.current}/{account.requests.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})