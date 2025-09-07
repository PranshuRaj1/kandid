"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Mail, MessageSquare, UserCheck, Calendar, TrendingUp, BarChart3, ArrowLeft, Eye } from "lucide-react"
import { useCampaignStore, type Campaign } from "@/lib/store/campaign-store"

interface CampaignDetailsProps {
  campaignId: string
  onBack: () => void
}

export function CampaignDetails({ campaignId, onBack }: CampaignDetailsProps) {
  const { campaigns, getCampaignLeads } = useCampaignStore()
  const [activeTab, setActiveTab] = useState("overview")

  const campaign = campaigns.find((c) => c.id === campaignId)
  const leads = getCampaignLeads(campaignId)

  if (!campaign) {
    return <div>Campaign not found</div>
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "leads", label: "Leads", icon: Users },
    { id: "sequence", label: "Sequence", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Calendar },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Details</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your campaign performance</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{campaign.status}</Badge>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && <OverviewTab campaign={campaign} />}
        {activeTab === "leads" && <LeadsTab leads={leads} />}
        {activeTab === "sequence" && <SequenceTab />}
        {activeTab === "settings" && <SettingsTab campaign={campaign} />}
      </div>
    </div>
  )
}

function OverviewTab({ campaign }: { campaign: Campaign }) {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Leads</span>
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.totalLeads}</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Request Sent</span>
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.requestSent}</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Request Accepted</span>
            <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.requestAccepted}</div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Request Replied</span>
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.requestReplied}</div>
        </div>
      </div>

      {/* Progress and Details */}
      <div className="grid grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Leads Contacted</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Acceptance Rate</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Reply Rate</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Start Date: {campaign.startDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Status: {campaign.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Conversion Rate: {campaign.conversionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadsTab({ leads }: { leads: any[] }) {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 py-3 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400">
        <div>Name</div>
        <div>Lead Description</div>
        <div>Activity</div>
        <div>Status</div>
      </div>

      {/* Leads List */}
      <div className="space-y-2">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="grid grid-cols-4 gap-4 py-4 px-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                  {lead.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-900 dark:text-white">{lead.name}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 truncate">{lead.description}</div>
            <div className="flex items-center">
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
            <div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                {lead.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SequenceTab() {
  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">Message Sequence</div>

      {/* Request Message */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Request Message</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edit your request message here.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Available fields:</h4>
            <div className="space-y-2 text-sm">
              <div className="text-blue-600 dark:text-blue-400">{"{{fullName}}"} - Full Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{firstName}}"} - First Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{lastName}}"} - Last Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{jobTitle}}"} - Job Title</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Message Template</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Design your message template using the available fields
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                💡 Use {"{{field_name}}"} to insert mapped fields from your Data.
              </p>
            </div>
            <Textarea
              className="mt-3 min-h-[120px]"
              placeholder="Hi {{firstName}}, I'm building consultative AI salespersons for personal care brands with the guarantee to boost your D2C revenue by min of 2%. Would love to connect if you're open to exploring this for Just Herbs!"
            />
          </div>
        </div>
      </div>

      {/* Connection Message */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Connection Message</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edit your connection message here.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
        <Textarea
          className="min-h-[100px]"
          defaultValue="Awesome to connect, {{firstName}}! Allow me to explain Kandid a bit: So these are consultative salespersons that engage with visitors like an offline store salesperson does. It helps them with product recommendations based on their preferences/concerns. Here's a video to help you visualise it better: https://youtu.be/33lXxvg-vPo"
        />
      </div>

      {/* Follow-up Messages */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">First Follow-up Message</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edit your first follow-up message here.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
        <Textarea className="min-h-[80px]" defaultValue="you like to explore a POC for Just Herbs?" />
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Send</span>
          </div>
          <Select defaultValue="1day">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 dark:text-gray-300">After Welcome Message</span>
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Second Follow-up Message</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edit your second follow-up message here.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
        <Textarea
          className="min-h-[80px]"
          defaultValue="Hi {{firstName}}, just following up on my message. Just try it for 1 week. No cost. If it doesn't deliver results, you can remove it."
        />
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Send</span>
          </div>
          <Select defaultValue="1day">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 dark:text-gray-300">After First Follow-up</span>
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ campaign }: { campaign: Campaign }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Settings</h2>
        <Button>Save All Changes</Button>
      </div>

      {/* Campaign Details */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
            <Input defaultValue={campaign.name} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Status</label>
            </div>
            <Switch defaultChecked={campaign.status === "Active"} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Request without personalization
              </label>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* AutoPilot Mode */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">AutoPilot Mode</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Let the system automatically manage LinkedIn account assignments
            </p>
          </div>
          <Switch />
        </div>

        <div className="mt-4">
          <Select defaultValue="1account">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1account">1 account selected</SelectItem>
              <SelectItem value="2accounts">2 accounts selected</SelectItem>
              <SelectItem value="3accounts">3 accounts selected</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Accounts:</p>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs">JL</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-900 dark:text-white">Jivesh Lakhani</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
