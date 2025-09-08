"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import type { Campaign } from "@/db/schema" // Import the Campaign type from your schema file
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// The CampaignStatus type is derived from the schema, ensuring type safety.
type CampaignStatus = Campaign['status'];

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
  const [isLoading, setIsLoading] = useState(true) // Start with loading state true
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetches campaign data from the API endpoint
    const fetchCampaigns = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/campaigns');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Campaign[] = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const filteredCampaigns =
    selectedCampaign === "All Campaigns"
      ? campaigns
      : campaigns.filter((campaign) => campaign.name === selectedCampaign)

  // Determines badge color based on campaign status
  const getStatusBadgeColor = (status: CampaignStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-sm text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Draft":
        return "bg-gray-100 text-sm text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      case "Paused":
        return "bg-yellow-100 text-sm text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "Completed":
        return "bg-blue-100 text-sm text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      default:
        return "bg-gray-100 text-sm text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  // Render loading skeleton while fetching data
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <CampaignSkeleton />
      </div>
    )
  }
  
  // Render error message if fetching fails
  if (error) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700 p-6 text-center text-red-600 dark:text-red-400">
            {error}
        </div>
      )
  }

  // Render the main component with campaign data
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm font-medium text-gray-900 dark:text-white">Campaigns</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[80px] justify-between text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent dark:bg-transparent"
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
            {/* Populate dropdown from fetched campaigns */}
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

      {/* Campaign list */}
      <div className="space-y-1 overflow-y-auto max-h-64">
        {/* Render filtered campaigns from state */}
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex items-center text-sm justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
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

      {/* Display message if no campaigns are found */}
      {filteredCampaigns.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">No campaigns found</div>
      )}
    </div>
  )
}

