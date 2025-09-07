"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Menu, X, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mock data for leads
const leadsData = [
  {
    id: 1,
    name: "Om Satyarthy",
    title: "Regional Head",
    avatar: "/professional-man-avatar.png",
    campaign: "Gynoveda",
    activity: [3, 5, 2, 4, 6],
    status: "pending",
    lastActivity: "Pending Approval",
    profileInfo: {
      company: "Regional Healthcare Solutions",
      location: "Mumbai, India",
      phone: "+91 98765 43210",
      email: "om.satyarthy@healthcare.com",
    },
  },
  {
    id: 2,
    name: "Dr. Bhuvaneshwari",
    title: "Fertility & Women's Health • A...",
    avatar: "/professional-woman-doctor-avatar.jpg",
    campaign: "Gynoveda",
    activity: [2, 3, 4, 2, 5],
    status: "sent",
    lastActivity: "Sent 7 mins ago",
    profileInfo: {
      company: "Women's Health Clinic",
      location: "Bangalore, India",
      phone: "+91 98765 43211",
      email: "dr.bhuvaneshwari@clinic.com",
    },
  },
  {
    id: 3,
    name: "Surdeep Singh",
    title: "Building Product-led SEO Growth Systems | Edtech/ HealthTech/ Fintech/ D2C | surdeepsingh.com | XLRI",
    avatar: "/professional-man-beard-avatar.jpg",
    campaign: "Gynoveda",
    activity: [4, 2, 6, 3, 4],
    status: "sent",
    lastActivity: "Sent 7 mins ago",
    profileInfo: {
      company: "Growth Systems Consulting",
      location: "Delhi, India",
      phone: "+91 98765 43212",
      email: "surdeep@growthsystems.com",
    },
  },
  {
    id: 4,
    name: "Dilbag Singh",
    title: "Manager Marketing & Communication...",
    avatar: "/professional-man-turban-avatar.jpg",
    campaign: "Gynoveda",
    activity: [3, 4, 2, 5, 3],
    status: "sent",
    lastActivity: "Sent 7 mins ago",
    profileInfo: {
      company: "Marketing Solutions Ltd",
      location: "Chandigarh, India",
      phone: "+91 98765 43213",
      email: "dilbag@marketing.com",
    },
  },
  {
    id: 5,
    name: "Vanshy Jain",
    title: "Ayurveda|primary infertility|...",
    avatar: "/professional-woman-ayurveda-avatar.jpg",
    campaign: "Gynoveda",
    activity: [2, 5, 3, 4, 2],
    status: "sent",
    lastActivity: "Sent 7 mins ago",
    profileInfo: {
      company: "Ayurveda Wellness Center",
      location: "Jaipur, India",
      phone: "+91 98765 43214",
      email: "vanshy@ayurveda.com",
    },
  },
  {
    id: 6,
    name: "Sunil Pal",
    title: "Helping Fashion & Lifestyle Br...",
    avatar: "/professional-man-fashion-avatar.jpg",
    campaign: "Digi Sidekick",
    activity: [5, 3, 4, 2, 6],
    status: "pending",
    lastActivity: "Pending Approval",
    profileInfo: {
      company: "Fashion Digital Agency",
      location: "Mumbai, India",
      phone: "+91 98765 43215",
      email: "sunil@fashion.com",
    },
  },
  {
    id: 7,
    name: "Utkarsh K.",
    title: "Airbnb Host | Ex-The Skin Stor...",
    avatar: "/professional-man-host-avatar.jpg",
    campaign: "The skin story",
    activity: [4, 6, 2, 5, 3],
    status: "blocked",
    lastActivity: "Do Not Contact",
    profileInfo: {
      company: "Hospitality Services",
      location: "Goa, India",
      phone: "+91 98765 43216",
      email: "utkarsh@hospitality.com",
    },
  },
  {
    id: 8,
    name: "Shreya Ramakrishna",
    title: "Deputy Manager - Founder's Off...",
    avatar: "/professional-woman-manager-avatar.jpg",
    campaign: "Pokonut",
    activity: [3, 4, 5, 2, 4],
    status: "followup",
    lastActivity: "Followup 10 mins ago",
    profileInfo: {
      company: "Startup Incubator",
      location: "Bangalore, India",
      phone: "+91 98765 43217",
      email: "shreya@startup.com",
    },
  },
  {
    id: 9,
    name: "Deepak Kumar",
    title: "Deputy manager Advertising and...",
    avatar: "/professional-man-advertising-avatar.jpg",
    campaign: "Re'equil",
    activity: [2, 3, 4, 6, 2],
    status: "followup",
    lastActivity: "Followup 10 mins ago",
    profileInfo: {
      company: "Advertising Agency",
      location: "Delhi, India",
      phone: "+91 98765 43218",
      email: "deepak@advertising.com",
    },
  },
]

const statusConfig = {
  pending: { label: "Pending Approval", color: "bg-purple-100 text-purple-700 border-purple-200" },
  sent: { label: "Sent", color: "bg-orange-100 text-orange-700 border-orange-200" },
  blocked: { label: "Do Not Contact", color: "bg-gray-100 text-gray-700 border-gray-200" },
  followup: { label: "Followup", color: "bg-blue-100 text-blue-700 border-blue-200" },
}

const ActivityChart = ({ status }: { status: string }) => {
  const getBarColors = (status: string) => {
    switch (status) {
      case "sent":
        // 1 yellow bar + 3 grey bars
        return [1, 0, 0, 0] // Only first bar is colored
      case "blocked":
        // 4 purple bars
        return [1, 1, 1, 1] // All bars are colored
      case "followup":
        // 2 blue bars + 2 grey bars
        return [1, 1, 0, 0] // First two bars are colored
      case "pending":
        // 3 purple bars + 1 grey bar
        return [1, 1, 1, 0] // First three bars are colored
      default:
        return [0, 0, 0, 0] // All grey bars
    }
  }

  const getBarColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-yellow-400"
      case "blocked":
        return "bg-purple-400"
      case "followup":
        return "bg-blue-400"
      case "pending":
        return "bg-purple-400"
      default:
        return "bg-gray-200"
    }
  }

  const barColors = getBarColors(status)
  const activeColor = getBarColor(status)

  return (
    <div className="flex items-center gap-1 h-8">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className={`rounded-sm w-2 h-6 ${barColors[index - 1] === 1 ? activeColor : "bg-gray-200"}`} />
      ))}
    </div>
  )
}


const LeadProfileSidebar = ({
  lead,
  isOpen,
  onClose,
}: {
  lead: (typeof leadsData)[0] | null
  isOpen: boolean
  onClose: () => void
}) => {
  if (!lead) return null

  const activities = [
    {
      type: "invitation",
      title: "Invitation Request",
      message: "Hi Surdeep, I'm building consultativ...",
      time: "Sent 7 mins ago",
      icon: CheckCircle,
      status: "completed",
    },
    {
      type: "connection",
      title: "Connection Status",
      message: "Check connection status",
      time: "",
      icon: AlertCircle,
      status: "pending",
    },
    {
      type: "acceptance",
      title: "Connection Acceptance Message",
      message: "Awesome to connect, Surdeep! Allow m...",
      time: "",
      icon: MessageSquare,
      status: "pending",
    },
    {
      type: "followup1",
      title: "Follow-up 1",
      message: "Hey, did you get a chance to go thro...",
      time: "",
      icon: Clock,
      status: "pending",
    },
    {
      type: "followup2",
      title: "Follow-up 2",
      message: "Hi Surdeep, just following up on my...",
      time: "",
      icon: Clock,
      status: "pending",
    },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-96 bg-white border-l shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Lead Profile</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={lead.avatar || "/placeholder.svg"} alt={lead.name} />
                <AvatarFallback>
                  {lead.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{lead.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{lead.title}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {lead.campaign}
                  </span>
                  <span className="text-orange-600">{lead.lastActivity}</span>
                </div>
              </div>
            </div>

            {/* Additional Profile Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Additional Profile Info</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Company:</span> {lead.profileInfo.company}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {lead.profileInfo.location}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {lead.profileInfo.phone}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {lead.profileInfo.email}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <h4 className="font-medium mb-4">Activity Timeline</h4>
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex gap-3">
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        activity.status === "completed" ? "bg-green-100" : "bg-gray-100",
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4", activity.status === "completed" ? "text-green-600" : "text-gray-500")}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-sm">{activity.title}</h5>
                        {activity.time && <span className="text-xs text-muted-foreground">{activity.time}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.message}</p>
                      {index < activities.length - 1 && <div className="w-px h-4 bg-gray-200 ml-4 mt-2"></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<(typeof leadsData)[0] | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLeadClick = (lead: (typeof leadsData)[0]) => {
    setSelectedLead(lead)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setTimeout(() => setSelectedLead(null), 300) // Wait for animation to complete
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto ">
        <Breadcrumb className="p-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="px-5" href="/leads">leads</BreadcrumbLink>
          </BreadcrumbItem>

        </BreadcrumbList>
    </Breadcrumb>

        {/* Leads Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Campaign Name
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Activity</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      Status
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {leadsData.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleLeadClick(lead)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={lead.avatar || "/placeholder.svg"} alt={lead.name} />
                          <AvatarFallback>
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{lead.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{lead.campaign}</td>
                    <td className="p-4">
                      {/* Updated ActivityChart to show 4 equal height bars with status-based coloring */}
                      <ActivityChart status={lead.status} />
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusConfig[lead.status as keyof typeof statusConfig].color}>
                        {lead.lastActivity}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Lead Profile Sidebar */}
      <LeadProfileSidebar lead={selectedLead} isOpen={sidebarOpen} onClose={closeSidebar} />
    </div>
  )
}
