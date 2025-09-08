import { CampaignsList } from "@/components/campaigns-list"

export default function HomePage() {
  return (

      <div className="flex flex-col h-full">

        <div className="flex-1 p-6 overflow-hidden">
          <CampaignsList />
        </div>
      </div>
  
  )
}
