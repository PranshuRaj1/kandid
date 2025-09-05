import { CampaignsComponent } from "@/components/campaign-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <CampaignsComponent />
      </div>
    </div>
  )
}
