"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart3, Users, Mail, MessageSquare, Calendar, TrendingUp, Clock, Eye, Save } from "lucide-react"
import { useState, useEffect } from "react"

// Hardcoded data types
interface Lead {
  id: string
  name: string
  description: string
  avatar?: string
  status: "Pending" | "Contacted" | "Responded" | "Converted"
}

interface CampaignWithLeads {
    id: number;
    name: string;
    status: "Active" | "Draft" | "Paused" | "Completed";
    createdAt: string;
    leads: Lead[];
}

// Hardcoded mock data
const mockLeads: Lead[] = [
  { id: "1", name: "Sumeet Malhotra", description: "Don't Stop When you tired Stop when You'...", status: "Contacted" },
  { id: "2", name: "Megha Sabhlok", description: "Co-founder,Just Herbs ( acquired by Mari...", status: "Responded" },
  { id: "3", name: "Archee P.", description: "Content and Marketing Specialist at Just...", status: "Converted" },
  { id: "4", name: "Hindustan Herbs", description: "Co-Founder at Hindustan Herbs", status: "Pending" },
  { id: "5", name: "Ritika Ohri", description: "Brand Manager: Marketing, Talent and Inn...", status: "Contacted" },
  { id: "6", name: "Praveen Kumar Gautam", description: "Vice President - Offline Sales @ Just He...", status: "Pending" },
  { id: "7", name: "Shubham Saboo", description: "Associated as C&F Agent & Superstockiest...", status: "Responded" },
];

const mockCampaign: CampaignWithLeads = {
    id: 1,
    name: "Just Herbs Campaign",
    status: "Active",
    createdAt: "2025-09-02T00:00:00.000Z",
    leads: mockLeads,
};


// Main Component
export function CampaignDetails({ campaignId, campaignName }: { campaignId: string, campaignName: string }) {
  const [activeTab, setActiveTab] = useState("Overview")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{mockCampaign.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your campaign performance</p>
        </div>
        <Badge className={`${
            mockCampaign.status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
        }`}>
            {mockCampaign.status}
        </Badge>
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
        {isLoading ? (
          <>
            {activeTab === "Overview" && <OverviewSkeleton />}
            {activeTab === "Leads" && <LeadsSkeleton />}
            {activeTab === "Sequence" && <SequenceSkeleton />}
            {activeTab === "Settings" && <SettingsSkeleton />}
          </>
        ) : (
          <>
            {activeTab === "Overview" && <OverviewTab campaign={mockCampaign} />}
            {activeTab === "Leads" && <LeadsTab leads={mockCampaign.leads} />}
            {activeTab === "Sequence" && <SequenceTab />}
            {activeTab === "Settings" && <SettingsTab campaign={mockCampaign} />}
          </>
        )}
      </div>
    </div>
  )
}


// --- Child Tab Components ---

function OverviewTab({ campaign }: { campaign: CampaignWithLeads }) {
    const totalLeads = campaign.leads.length;
    const requestSent = campaign.leads.filter(l => l.status === 'Contacted').length;
    const requestAccepted = campaign.leads.filter(l => l.status === 'Responded').length;
    const requestReplied = campaign.leads.filter(l => l.status === 'Converted').length;
  
    const contactedPercentage = totalLeads > 0 ? (requestSent / totalLeads) * 100 : 0;
    const acceptanceRate = requestSent > 0 ? (requestAccepted / requestSent) * 100 : 0;
    const replyRate = requestAccepted > 0 ? (requestReplied / requestAccepted) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={totalLeads} icon={Users} color="blue" />
        <StatCard title="Request Sent" value={requestSent} icon={Mail} color="green" />
        <StatCard title="Request Accepted" value={requestAccepted} icon={MessageSquare} color="purple" />
        <StatCard title="Request Replied" value={requestReplied} icon={TrendingUp} color="blue" />
      </div>

      {/* Progress and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Progress</h3>
          <div className="space-y-4">
            <ProgressItem label="Leads Contacted" value={contactedPercentage} />
            <ProgressItem label="Acceptance Rate" value={acceptanceRate} />
            <ProgressItem label="Reply Rate" value={replyRate} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Campaign Details</h3>
          <div className="space-y-3">
             <DetailItem icon={Calendar} label="Start Date" value={new Date(campaign.createdAt).toLocaleDateString()} />
             <DetailItem icon={BarChart3} label="Status" value={campaign.status} />
             <DetailItem icon={TrendingUp} label="Conversion Rate" value={`${replyRate.toFixed(1)}%`} />
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadsTab({ leads }: { leads: Lead[] }) {
  const statusConfig = {
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    Contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    Responded: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    Converted: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lead Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3">
                       <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} />
                      <AvatarFallback>{lead.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4"><div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{lead.description}</div></td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary" className={`capitalize ${statusConfig[lead.status]}`}>
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

function SettingsTab({ campaign }: { campaign: CampaignWithLeads }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Settings</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save All Changes</Button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Campaign Name</label>
          <Input defaultValue={campaign.name} />
        </div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Status</label>
          <Switch defaultChecked={campaign.status === "Active"} />
        </div>
      </div>
    </div>
  )
}


// --- Helper & Skeleton Components ---
const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: number | string, icon: React.ElementType, color: string }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
            <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
            </div>
        </div>
    </div>
);

const ProgressItem = ({ label, value }: { label: string, value: number }) => (
    <div>
        <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">{label}</span>
            <span className="text-gray-900 dark:text-white">{value.toFixed(1)}%</span>
        </div>
        <Progress value={value} className="h-2" />
    </div>
);

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-center">
        <Icon className="w-4 h-4 text-gray-400 mr-3" />
        <span className="text-sm text-gray-600 dark:text-gray-400">{label}:</span>
        <span className="text-sm text-gray-900 dark:text-white ml-2">{value}</span>
    </div>
);


function SequenceTab() {
  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">Message Sequence</div>

      {/* Request Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Request Message</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />Preview</Button>
            <Button size="sm"><Save className="w-4 h-4 mr-2" />Save</Button>
          </div>
        </div>
        <Textarea
          className="mt-3 min-h-[100px]"
          placeholder="Hi {{firstName}}, I'm building consultative AI salespersons for personal care brands..."
        />
      </div>

      {/* Follow-up Message */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">First Follow-up Message</h3>
           <div className="flex space-x-2">
            <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />Preview</Button>
            <Button size="sm"><Save className="w-4 h-4 mr-2" />Save</Button>
          </div>
        </div>
        <Textarea className="min-h-[100px]" defaultValue="...you like to explore a POC for Just Herbs?" />
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Send</span>
          </div>
          <Select defaultValue="1day">
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1day">1 day</SelectItem>
              <SelectItem value="2days">2 days</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 dark:text-gray-400">After Welcome Message</span>
        </div>
      </div>
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-8 w-12" /></div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LeadsSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                    <th className="px-6 py-3"><Skeleton className="h-4 w-24" /></th>
                    <th className="px-6 py-3"><Skeleton className="h-4 w-32" /></th>
                    <th className="px-6 py-3"><Skeleton className="h-4 w-20" /></th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

function SequenceSkeleton() {
  return (
    <div className="text-center text-gray-500 py-16">
      Loading Sequence...
    </div>
  )
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <Skeleton className="h-5 w-32 mb-4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  )
}

