"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Mock data based on your schema
const mockCampaigns = [
  { id: 1, name: "Just Herbs", status: "Active" as const },
  { id: 2, name: "Juicy chemistry", status: "Active" as const },
  { id: 3, name: "Hyugalife 2", status: "Active" as const },
  { id: 4, name: "Honeyveda", status: "Active" as const },
  { id: 5, name: "HempStreet", status: "Active" as const },
  // { id: 6, name: "HealthyHey 2", status: "Active" as const },
  // { id: 7, name: "Summer Sale", status: "Draft" as const },
  // { id: 8, name: "Holiday Campaign", status: "Paused" as const },
]

type CampaignStatus = "Draft" | "Active" | "Paused" | "Completed"

export function CampaignsComponent() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("All Campaigns")

  const filteredCampaigns =
    selectedCampaign === "All Campaigns"
      ? mockCampaigns
      : mockCampaigns.filter((campaign) => campaign.name === selectedCampaign)

  const getStatusBadgeColor = (status: CampaignStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "Paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 ">
      {/* Header with dropdown */}
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-medium text-gray-900">Campaigns</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[160px] justify-between text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              {selectedCampaign}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuItem onClick={() => setSelectedCampaign("All Campaigns")} className="cursor-pointer">
              All Campaigns
            </DropdownMenuItem>
            {mockCampaigns.map((campaign) => (
              <DropdownMenuItem
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign.name)}
                className="cursor-pointer"
              >
                {campaign.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Campaign list */}
      <div className="space-y-1 mt-4 max-h-72 ">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="font-medium text-gray-900">{campaign.name}</div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(campaign.status)}`}
            >
              {campaign.status}
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && <div className="text-center py-8 text-gray-500">No campaigns found</div>}
    </div>
  )
}
