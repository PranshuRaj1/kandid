import { CampaignsComponent } from "@/components/campaign-card"
import { LinkedInAccountsComponent } from "@/components/linkdin-card"
import { RecentActivityComponent } from "@/components/recent-activity-card"

export default function Dashboard() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6 pt-2">
      <div className="max-w-6xl mx-auto h-1/2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-1/2">
          {/* Left column - Campaigns and LinkedIn Accounts */}
          <div className="flex flex-col gap-3">
            <div className="flex-shrink-0">
              <CampaignsComponent />
            </div>
            <div className="flex-1 min-h-0">
              <LinkedInAccountsComponent />
            </div>
          </div>

          {/* Right column - Recent Activity */}
          <div className="flex flex-col">
            <div className="flex-1 min-h-0">
              <RecentActivityComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
