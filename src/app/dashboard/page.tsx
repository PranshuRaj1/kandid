import { CampaignsComponent } from "@/components/campaign-card"
import { LinkedInAccountsComponent } from "@/components/linkdin-card"
import { RecentActivityComponent } from "@/components/recent-activity-card"


export default function Dashboard() {
  return (
    <>  
    <div className="min-h-screen bg-gray-50 py-1 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
       
          {/* Left column */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-8/17">
              <div className="w-full">
                <CampaignsComponent />
              </div>
              <div className="">
                <LinkedInAccountsComponent />
              </div>
            </div>
            <div className="w-9/17">
              <RecentActivityComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}