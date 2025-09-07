"use client"

import { useState } from "react"

import { AppHeader } from "@/components/AppHeader"
import { CampaignsList } from "@/components/campaigns-list"
import { CampaignDetails } from "@/components/campaign-details"

export default function HomePage() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaignId(campaignId)
  }

  const handleBackToCampaigns = () => {
    setSelectedCampaignId(null)
  }

  return (

      <div className="flex flex-col h-full">
   
        <div className="flex-1 overflow-auto">
          {selectedCampaignId ? (
            <CampaignDetails  campaignId={selectedCampaignId} onBack={handleBackToCampaigns} />
          ) : (
            <CampaignsList onCampaignSelect={handleCampaignSelect} />
          )}
        </div>
      </div>
 
  )
}
