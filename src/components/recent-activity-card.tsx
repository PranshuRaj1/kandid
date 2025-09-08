"use client"

import { useState } from "react"
import { ChevronDown, Clock, Send, UserX } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

// Mock recent activity data
const mockActivities = [
  {
    id: 1,
    lead: {
      name: "Om Satyarthy",
      title: "Regional Head",
      avatar: "/professional-man-headshot-blue-shirt.jpg",
    },
    campaign: "Gynoveda",
    status: { type: "pending", text: "Pending Approval" },
  },
  {
    id: 2,
    lead: {
      name: "Dr. Bhuvaneshwari",
      title: "Fertility & Women's Health + A...",
      avatar: "/professional-woman-ayurveda-avatar.jpg",
    },
    campaign: "Gynoveda",
    status: { type: "sent", text: "Sent 7 mins ago" },
  },
  {
    id: 3,
    lead: {
      name: "Surdeep Singh",
      title: "Building Product-led SEO Growt...",
      avatar: "/professional-man-headshot-beard.png",
    },
    campaign: "Gynoveda",
    status: { type: "sent", text: "Sent 7 mins ago" },
  },
  {
    id: 4,
    lead: {
      name: "Dilbag Singh",
      title: "Manager Marketing & Communicat...",
      avatar: "/professional-man-headshot-blue-shirt.jpg",
    },
    campaign: "Gynoveda",
    status: { type: "sent", text: "Sent 7 mins ago" },
  },
  {
    id: 5,
    lead: {
      name: "Vanshy Jain",
      title: "Ayurveda||primary infertility|...",
      avatar: "/professional-man-headshot-beard.png",
    },
    campaign: "Gynoveda",
    status: { type: "sent", text: "Sent 7 mins ago" },
  },
  {
    id: 6,
    lead: {
      name: "Sunil Pal",
      title: "Helping Fashion & Lifestyle Br...",
      avatar: "/professional-man-headshot-blue-shirt.jpg",
    },
    campaign: "Digi Sidekick",
    status: { type: "pending", text: "Pending Approval" },
  },
  {
    id: 7,
    lead: {
      name: "Utkarsh K.",
      title: "Airbnb Host | Ex-The Skin Stor...",
      avatar: "/professional-man-headshot-beard.png",
    },
    campaign: "The skin story",
    status: { type: "no-contact", text: "Do Not Contact" },
  },
  {
    id: 8,
    lead: {
      name: "Shreya Ramakrishna",
      title: "Deputy Manager - Founder's Off...",
      avatar: "/professional-woman-headshot-business.png",
    },
    campaign: "Pokonut",
    status: { type: "followup", text: "Followup 10 mins ago" },
  },
]

function RecentActivitySkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid grid-cols-3 gap-4 pb-4">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 items-center py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
            <div className="flex justify-end">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentActivityComponent() {
  const [sortBy, setSortBy] = useState("Most Recent")
  const [isLoading, setIsLoading] = useState(false)

  const getStatusBadge = (status: { type: string; text: string }) => {
    switch (status.type) {
      case "pending":
        return (
          <div className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {status.text}
          </div>
        )
      case "sent":
        return (
          <div className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Send className="h-3 w-3" />
            {status.text}
          </div>
        )
      case "no-contact":
        return (
          <div className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <UserX className="h-3 w-3" />
            {status.text}
          </div>
        )
      case "followup":
        return (
          <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Send className="h-3 w-3" />
            {status.text}
          </div>
        )
      default:
        return (
          <div className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
            {status.text}
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 ">
        <RecentActivitySkeleton />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6  flex flex-col">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">Recent Activity</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[140px] justify-between text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-transparent"
            >
              {sortBy}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuItem
              onClick={() => setSortBy("Most Recent")}
              className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Most Recent
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("Oldest First")}
              className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("By Campaign")}
              className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              By Campaign
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table headers */}
      <div className="grid grid-cols-3 gap-4 pb-4 mb-4 border-b border-gray-100 text-sm dark:border-gray-700 flex-shrink-0">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Lead</div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Campaign</div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</div>
      </div>

      {/* Activity list (MODIFIED) */}
      <div className="overflow-y-auto max-h-[39.5rem]">
        <div className="space-y-1">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="grid grid-cols-3 text-xs gap-4 items-center py-3">
              {/* Lead info */}
              <div className="flex items-center text-xs gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.lead.avatar || "/placeholder.svg"} alt={activity.lead.name} />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {activity.lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{activity.lead.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{activity.lead.title}</div>
                </div>
              </div>

              {/* Campaign */}
              <div className="font-medium px-4 text-gray-900 dark:text-white">{activity.campaign}</div>

              {/* Status */}
              <div className="flex justify-end">{getStatusBadge(activity.status)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}