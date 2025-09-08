"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import type { Campaign } from "@/db/schema" // Use your actual schema path
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Type for CampaignStatus, derived from the schema for type safety.
type CampaignStatus = Campaign['status'];

// A dedicated function to fetch campaigns from the API.
// This will be used by Tanstack Query.
const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch('/api/campaigns');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

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
  const [selectedCampaign, setSelectedCampaign] = useState<string>("All Campaigns");

  // useQuery handles fetching, caching, loading, and error states.
  const { data: campaigns = [], isLoading, error } = useQuery<Campaign[]>({
    queryKey: ['campaigns'], // Unique key for this query
    queryFn: fetchCampaigns,    // The function that will fetch the data
  });

  // Filtering logic remains the same, but now uses data from useQuery.
  const filteredCampaigns =
    selectedCampaign === "All Campaigns"
      ? campaigns
      : campaigns.filter((campaign) => campaign.name === selectedCampaign)

  // Function to determine the badge color based on campaign status.
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

  // Render the skeleton UI while data is being fetched.
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <CampaignSkeleton />
      </div>
    )
  }
  
  // Render an error message if the data fetching fails.
  if (error) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700 p-6 text-center text-red-600 dark:text-red-400">
            Failed to load campaigns.
        </div>
      )
  }

  // Render the main component with the fetched campaign data.
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
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
            {campaigns.map((campaign) => (
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

      <div className="space-y-1 overflow-y-auto max-h-64 pr-2">
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

      {filteredCampaigns.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">No campaigns found</div>
      )}
    </div>
  )
}

