import { create } from "zustand"

export interface Campaign {
  id: string
  name: string
  status: "Active" | "Inactive"
  totalLeads: number
  requestSent: number
  requestAccepted: number
  requestReplied: number
  connectionRequests: number
  connectionMessages: number
  startDate: string
  conversionRate: number
}

export interface Lead {
  id: string
  name: string
  description: string
  avatar: string
  status: "Pending" | "Connected" | "Replied"
  campaignId: string
}

interface CampaignStore {
  campaigns: Campaign[]
  leads: Lead[]
  selectedCampaign: Campaign | null
  setSelectedCampaign: (campaign: Campaign | null) => void
  getCampaignLeads: (campaignId: string) => Lead[]
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Just Herbs",
    status: "Active",
    totalLeads: 20,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "02/09/2025",
    conversionRate: 0.0,
  },
  {
    id: "2",
    name: "Juicy chemistry",
    status: "Active",
    totalLeads: 11,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "01/09/2025",
    conversionRate: 0.0,
  },
  {
    id: "3",
    name: "Hyugalife 2",
    status: "Active",
    totalLeads: 19,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "31/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "4",
    name: "Honeyveda",
    status: "Active",
    totalLeads: 3,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "30/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "5",
    name: "HempStreet",
    status: "Active",
    totalLeads: 7,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "29/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "6",
    name: "HealthyHey 2",
    status: "Active",
    totalLeads: 5,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "28/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "7",
    name: "Herbal Chakra",
    status: "Active",
    totalLeads: 19,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "27/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "8",
    name: "Healofy",
    status: "Active",
    totalLeads: 14,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "26/08/2025",
    conversionRate: 0.0,
  },
  {
    id: "9",
    name: "HealthSense",
    status: "Active",
    totalLeads: 2,
    requestSent: 0,
    requestAccepted: 0,
    requestReplied: 0,
    connectionRequests: 0,
    connectionMessages: 0,
    startDate: "25/08/2025",
    conversionRate: 0.0,
  },
]

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sumeet Malhotra",
    description: "Don't Stop When you tired Stop when You'...",
    avatar: "/professional-man.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "2",
    name: "Megha Sabhlok",
    description: "Co-founder,Just Herbs ( acquired by Mari...",
    avatar: "/professional-woman-diverse.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "3",
    name: "Archee P.",
    description: "Content and Marketing Specialist at Just...",
    avatar: "/marketing-professional.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "4",
    name: "Hindustan Herbs",
    description: "Co-Founder at Hindustan Herbs",
    avatar: "/business-owner.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "5",
    name: "Ritika Ohri",
    description: "Brand Manager: Marketing, Talent and Inn...",
    avatar: "/brand-manager.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "6",
    name: "Praveen Kumar Gautam",
    description: "Vice President - Offline Sales @ Just He...",
    avatar: "/sales-executive.png",
    status: "Pending",
    campaignId: "1",
  },
  {
    id: "7",
    name: "Shubham Saboo",
    description: "Associated as C&F Agent & Superstockiest...",
    avatar: "/business-agent.jpg",
    status: "Pending",
    campaignId: "1",
  },
]

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: mockCampaigns,
  leads: mockLeads,
  selectedCampaign: null,
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
  getCampaignLeads: (campaignId) => {
    const { leads } = get()
    return leads.filter((lead) => lead.campaignId === campaignId)
  },
}))
