"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Users, MessageSquare, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import type { CampaignWithStats } from "@/db/schema" // Import our new detailed type

// This function fetches campaigns with stats from our new API endpoint.
const fetchCampaignsWithStats = async ({ queryKey }: any): Promise<CampaignWithStats[]> => {
    const [_, { search, status }] = queryKey;
    const response = await fetch(`/api/campaigns-stats?query=${search}&status=${status}`);
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function CampaignsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-9 w-80" />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                      <th className="px-6 py-3 text-left"><Skeleton className="h-4 w-24" /></th>
                      <th className="px-6 py-3 text-left"><Skeleton className="h-4 w-16" /></th>
                      <th className="px-6 py-3 text-left"><Skeleton className="h-4 w-20" /></th>
                      <th className="px-6 py-3 text-left"><Skeleton className="h-4 w-24" /></th>
                      <th className="px-6 py-3 text-left"><Skeleton className="h-4 w-28" /></th>
                  </tr>
              </thead>
              <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                          <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                          <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                          <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                          <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                          <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function CampaignsList() {
  const [activeTab, setActiveTab] = useState("All Campaigns")
  const [inputValue, setInputValue] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Debouncing effect for the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputValue);
    }, 800); // 800ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Tanstack Query to fetch campaign data
  const { data: campaigns = [], isLoading, error } = useQuery<CampaignWithStats[]>({
    queryKey: ['campaigns-stats', { search: debouncedSearch, status: activeTab }],
    queryFn: fetchCampaignsWithStats,
  });

  const handleCampaignClick = (campaignId: number, campaignName: string) => {
    // Using window.location for navigation to avoid router dependency issues.
    window.location.href = `/campaign/${campaignName}?name=${encodeURIComponent(campaignName)}`;
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col space-y-6 overflow-hidden p-4 md:p-6">
        <CampaignsTableSkeleton />
      </div>
    )
  }

  if (error) {
      return <div className="p-6 text-center text-red-500">Failed to load campaigns.</div>
  }

  return (
    <div className="h-full flex flex-col space-y-6 overflow-hidden p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
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
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex space-x-1">
          {["All Campaigns", "Active", "Paused", "Draft", "Completed"].map((tab) => (
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10 w-80 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
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
                  Request Status (Dummy)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Connection Status (Dummy)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaigns.map((campaign) => (
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
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">0</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                       <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">0</div>
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

