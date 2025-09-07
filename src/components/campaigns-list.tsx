"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, MessageSquare, Plus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Campaign {
  id: string
  name: string
  status: "Active" | "Inactive"
  totalLeads: number
  requestSent: number
  requestAccepted: number
  requestReplied: number
  connectionSent: number
  connectionAccepted: number
}

// Mock data remains the same...
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Just Herbs",
    status: "Active",
    totalLeads: 20,
    requestSent: 0,
    requestAccepted: 20,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "2",
    name: "Juicy chemistry",
    status: "Active",
    totalLeads: 11,
    requestSent: 0,
    requestAccepted: 11,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "3",
    name: "Hyugalife 2",
    status: "Active",
    totalLeads: 19,
    requestSent: 0,
    requestAccepted: 19,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "4",
    name: "Honeyveda",
    status: "Active",
    totalLeads: 3,
    requestSent: 0,
    requestAccepted: 3,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "5",
    name: "HempStreet",
    status: "Active",
    totalLeads: 7,
    requestSent: 0,
    requestAccepted: 7,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "6",
    name: "HealthyHey 2",
    status: "Active",
    totalLeads: 5,
    requestSent: 0,
    requestAccepted: 5,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "7",
    name: "Herbal Chakra",
    status: "Active",
    totalLeads: 19,
    requestSent: 0,
    requestAccepted: 19,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "8",
    name: "Healofy",
    status: "Active",
    totalLeads: 14,
    requestSent: 0,
    requestAccepted: 14,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
  {
    id: "9",
    name: "HealthSense",
    status: "Active",
    totalLeads: 2,
    requestSent: 0,
    requestAccepted: 2,
    requestReplied: 0,
    connectionSent: 0,
    connectionAccepted: 0,
  },
]


export function CampaignsList() {
  const [activeTab, setActiveTab] = useState("All Campaigns")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCampaignClick = (campaignId: string, campaignName: string) => {
    router.push(`/campaign/${campaignId}?name=${encodeURIComponent(campaignName)}`)
  }

  return (
    // CHANGE 1: Main container set to flex column, full screen height, and gap for spacing.
    <div className="flex flex-col h-screen p-6 gap-6 bg-gray-50 dark:bg-gray-900 border rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your campaigns and track their performance.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Tabs and Search */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {["All Campaigns", "Active", "Inactive"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className={`${
                activeTab === tab
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
      </div>

      {/* Table */}
      {/* CHANGE 2: Table wrapper grows to fill remaining space and handles its own vertical scrolling. */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Campaign Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Total Leads
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Request Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Connection Status
        </th>
      </tr>
    </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCampaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleCampaignClick(campaign.id, campaign.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="secondary"
                      className={`${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}
                    >
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {campaign.totalLeads}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-600 dark:text-gray-400">{campaign.requestSent}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-gray-600 dark:text-gray-400">{campaign.requestAccepted}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-gray-600 dark:text-gray-400">{campaign.requestReplied}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400">{campaign.connectionSent}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MessageSquare className="w-4 h-4 mr-1 text-purple-500" />
                        <span className="text-gray-600 dark:text-gray-400">{campaign.connectionAccepted}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}