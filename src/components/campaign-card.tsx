"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data based on your schema
const mockCampaigns = [
  { id: 1, name: "Just Herbs", status: "Active" as const },
  { id: 2, name: "Juicy chemistry", status: "Active" as const },
  { id: 3, name: "Hyugalife 2", status: "Active" as const },
  { id: 4, name: "Honeyveda", status: "Active" as const },
  { id: 5, name: "HempStreet", status: "Active" as const },
  { id: 6, name: "HealthyHey 2", status: "Active" as const },
]

type CampaignStatus = "Draft" | "Active" | "Paused" | "Completed"

function CampaignSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CampaignsComponent() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("All Campaigns")
  const [isLoading, setIsLoading] = useState(false)

  const filteredCampaigns =
    selectedCampaign === "All Campaigns"
      ? mockCampaigns
      : mockCampaigns.filter((campaign) => campaign.name === selectedCampaign)

  const getStatusBadgeColor = (status: CampaignStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      case "Paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <CampaignSkeleton />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">Campaigns</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[160px] justify-between text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-transparent"
            >
              {selectedCampaign}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[160px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <DropdownMenuItem
              onClick={() => setSelectedCampaign("All Campaigns")}
              className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              All Campaigns
            </DropdownMenuItem>
            {mockCampaigns.map((campaign) => (
              <DropdownMenuItem
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign.name)}
                className="cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {campaign.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Campaign list */}
      <div className="space-y-1 overflow-y-auto max-h-64">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          >
            <div className="font-medium text-gray-900 dark:text-white">{campaign.name}</div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(campaign.status)}`}
            >
              {campaign.status}
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">No campaigns found</div>
      )}
    </div>
  )
}
