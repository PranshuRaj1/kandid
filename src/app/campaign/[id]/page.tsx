import { LayoutWrapper } from "@/components/sidebar-wrapper"
import { AppHeader } from "@/components/AppHeader"
import { CampaignDetails } from "@/components/campaign-details"

interface CampaignPageProps {
  params: { id: string }
  searchParams: { name?: string }
}

export default function CampaignPage({ params, searchParams }: CampaignPageProps) {
  return (
   
      <div className="flex flex-col h-full">
   
        <div className="flex-1 p-6">
          <CampaignDetails campaignId={params.id} campaignName={searchParams.name || "Campaign"} />
        </div>
      </div>
    
  )
}
