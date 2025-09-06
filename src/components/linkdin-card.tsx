"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock LinkedIn accounts data
const mockLinkedInAccounts = [
  {
    id: 1,
    name: "Pulkit Garg",
    email: "1999pulkitgarg@gmail.com",
    avatar: "/professional-man-headshot.png",
    status: "Connected",
    requests: { current: 17, total: 30 },
  },
  {
    id: 2,
    name: "Jivesh Lakhani",
    email: "jivesh@gmail.com",
    avatar: "/professional-man-headshot-glasses.png",
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
    avatar: "/professional-woman-headshot.png",
    status: "Connected",
    requests: { current: 18, total: 100 },
  },
  // {
  //   id: 5,
  //   name: "Pulkit Garg",
  //   email: "1999pulkitgarg@gmail.com",
  //   avatar: "/professional-man-headshot.png",
  //   status: "Connected",
  //   requests: { current: 17, total: 30 },
  // },
]

export function LinkedInAccountsComponent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <h2 className="text-xl font-medium text-gray-900 mb-6">LinkedIn Accounts</h2>

      {/* Table headers */}
      <div className="grid grid-cols-3 gap-4 pb-4 mb-4 border-b border-gray-100">
        <div className="text-sm font-medium text-gray-500">Account</div>
        <div className="text-sm font-medium text-gray-500 text-center">Status</div>
        <div className="text-sm font-medium text-gray-500 text-right">Requests</div>
      </div>

      {/* Account list */}
      <div className="space-y-1 max-h-72 ">
        {mockLinkedInAccounts.map((account) => (
          <div key={account.id} className="grid grid-cols-3 gap-4 items-center py-3">
            {/* Account info */}
            <div className="flex items-center ">
              <Avatar className="h-10 w-10">
                <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
                <AvatarFallback>
                  {account.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{account.name}</span>
                  <div className="w-4 h-4 bg-orange-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{account.email}</div>
              </div>
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
                Connected
              </div>
            </div>

            {/* Requests progress */}
            <div className="flex items-center justify-end gap-3">
              <div className="flex-1 max-w-[100px]">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(account.requests.current / account.requests.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 min-w-[40px]">
                {account.requests.current}/{account.requests.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
