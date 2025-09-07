"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Mail, MessageSquare, UserCheck } from "lucide-react"
import { useCampaignStore } from "@/lib/store/campaign-store"

interface CampaignsListProps {
  onCampaignSelect: (campaignId: string) => void
}

export function CampaignsList({ onCampaignSelect }: CampaignsListProps) {
  const { campaigns } = useCampaignStore()

  const handleCampaignClick = (campaignId: string) => {
    onCampaignSelect(campaignId)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your campaigns and track their performance.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Campaign</Button>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 rounded-none"
            >
              All Campaigns
            </Button>
            <Button variant="ghost" className="text-gray-500 dark:text-gray-400">
              Active
            </Button>
            <Button variant="ghost" className="text-gray-500 dark:text-gray-400">
              Inactive
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search campaigns..." className="pl-10 w-80" />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div>Campaign Name</div>
          <div>Status</div>
          <div>Total Leads</div>
          <div>Request Status</div>
          <div>Connection Status</div>
          <div></div>
        </div>
      </div>

      {/* Campaign Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            onClick={() => handleCampaignClick(campaign.id)}
          >
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* Campaign Name */}
              <div className="font-medium text-gray-900 dark:text-white">{campaign.name}</div>

              {/* Status */}
              <div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {campaign.status}
                </Badge>
              </div>

              {/* Total Leads */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4" />
                <span>{campaign.totalLeads}</span>
              </div>

              {/* Request Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm">{campaign.requestAccepted}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{campaign.requestSent}</span>
                </div>
                <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{campaign.requestReplied}</span>
                </div>
              </div>

              {/* Connection Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm">{campaign.connectionRequests}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{campaign.connectionMessages}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  •••
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
