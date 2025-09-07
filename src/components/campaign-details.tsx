"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Mail, MessageSquare, Calendar, TrendingUp, Clock, Eye, Save } from "lucide-react"
import { useState } from "react"

interface CampaignDetailsProps {
  campaignId: string
  campaignName: string
}

interface Lead {
  id: string
  name: string
  description: string
  avatar?: string
  status: "Pending" | "Contacted" | "Replied" | "Connected"
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sumeet Malhotra",
    description: "Don't Stop When you tired Stop when You'...",
    status: "Pending",
  },
  {
    id: "2",
    name: "Megha Sabhlok",
    description: "Co-founder,Just Herbs ( acquired by Mari...",
    status: "Pending",
  },
  {
    id: "3",
    name: "Archee P.",
    description: "Content and Marketing Specialist at Just...",
    status: "Pending",
  },
  {
    id: "4",
    name: "Hindustan Herbs",
    description: "Co-Founder at Hindustan Herbs",
    status: "Pending",
  },
  {
    id: "5",
    name: "Ritika Ohri",
    description: "Brand Manager: Marketing, Talent and Inn...",
    status: "Pending",
  },
  {
    id: "6",
    name: "Praveen Kumar Gautam",
    description: "Vice President - Offline Sales @ Just He...",
    status: "Pending",
  },
  {
    id: "7",
    name: "Shubham Saboo",
    description: "Associated as C&F Agent & Superstockiest...",
    status: "Pending",
  },
]

export function CampaignDetails({ campaignId, campaignName }: CampaignDetailsProps) {
  const [activeTab, setActiveTab] = useState("Overview")

  const tabs = [
    { id: "Overview", label: "Overview", icon: BarChart3 },
    { id: "Leads", label: "Leads", icon: Users },
    { id: "Sequence", label: "Sequence", icon: MessageSquare },
    { id: "Settings", label: "Settings", icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Campaign Details</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your campaign performance</p>
        </div>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Overview" && <OverviewTab campaignName={campaignName} />}
        {activeTab === "Leads" && <LeadsTab />}
        {activeTab === "Sequence" && <SequenceTab />}
        {activeTab === "Settings" && <SettingsTab campaignName={campaignName} />}
      </div>
    </div>
  )
}

function OverviewTab({ campaignName }: { campaignName: string }) {
  return (
    <div className="space-y-6 overflow-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">20</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Request Sent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Request Accepted</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Request Replied</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Leads Contacted</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Acceptance Rate</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Reply Rate</span>
                <span className="text-gray-900 dark:text-white">0.0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Start Date:</span>
              <span className="text-sm text-gray-900 dark:text-white ml-2">02/09/2025</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
              <span className="text-sm text-gray-900 dark:text-white ml-2">Active</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate:</span>
              <span className="text-sm text-gray-900 dark:text-white ml-2">0.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Lead Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarImage src={lead.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{lead.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="w-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {lead.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SequenceTab() {
  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">Message Sequence</div>

      {/* Request Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Request Message</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Edit your request message here.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Available fields:</h4>
            <div className="space-y-2 text-sm">
              <div className="text-blue-600 dark:text-blue-400">{"{{fullName}}"} - Full Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{firstName}}"} - First Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{lastName}}"} - Last Name</div>
              <div className="text-blue-600 dark:text-blue-400">{"{{jobTitle}}"} - Job Title</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Message Template</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Design your message template using the available fields
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                💡 Use {"{{field_name}}"} to insert mapped fields from your Data.
              </p>
            </div>
            <Textarea
              className="mt-3 min-h-[100px]"
              placeholder="Hi {{firstName}}, I'm building consultative AI salespersons for personal care brands with the guarantee to boost your D2C revenue by min of 2%. Would love to connect if you're open to exploring this for Just Herbs!"
            />
          </div>
        </div>
      </div>

      {/* Connection Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Connection Message</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Edit your connection message here.</p>
        <Textarea
          className="min-h-[100px]"
          defaultValue="Awesome to connect, {{firstName}}! Allow me to explain Kandid a bit: So these are consultative salespersons that engage with visitors like an offline store salesperson does. It helps them with product recommendations based on their preferences/concerns. Here's a video to help you visualise it better: https://youtu.be/331Xvg-vPo"
        />
      </div>

      {/* First Follow-up Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">First Follow-up Message</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Edit your first follow-up message here.</p>
        <Textarea className="min-h-[100px]" defaultValue="you like to explore a POC for Just Herbs?" />
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Send</span>
          </div>
          <Select defaultValue="1day">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
              <SelectItem value="3days">3 days</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 dark:text-gray-400">After Welcome Message</span>
        </div>
      </div>

      {/* Second Follow-up Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Second Follow-up Message</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Edit your second follow-up message here.</p>
        <Textarea
          className="min-h-[100px]"
          defaultValue="Hi {{firstName}}, just following up on my message. Just try it for 1 week. No cost. If it doesn't deliver results, you can remove it."
        />
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Send</span>
          </div>
          <Select defaultValue="1day">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
              <SelectItem value="3days">3 days</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 dark:text-gray-400">After First Follow-up</span>
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ campaignName }: { campaignName: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Settings</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save All Changes</Button>
      </div>

      {/* Campaign Details */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Campaign Details</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
            <Input defaultValue={campaignName} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Status</label>
            </div>
            <Switch defaultChecked />
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">AutoPilot Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Let the system automatically manage LinkedIn account assignments
            </p>
          </div>
          <Switch />
        </div>

        <div className="mt-6">
          <Select defaultValue="1account">
            <SelectTrigger className="w-full">
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
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
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
