import { CampaignsComponent } from "@/components/campaign-card"
import { LinkedInAccountsComponent } from "@/components/linkdin-card"
import { RecentActivityComponent } from "@/components/recent-activity-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Dashboard() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="px-5" href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>

        </BreadcrumbList>
    </Breadcrumb>
    <div className="min-h-screen bg-gray-50 py-1 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
       
          {/* Left column */}
          <div className="flex gap-4 h-full">
            <div className="flex flex-col gap-4 w-8/17 h-full">
              <div className="w-full">
                <CampaignsComponent />
              </div>
              <div className="">
                <LinkedInAccountsComponent />
              </div>
            </div>
            <div className="w-9/17 h-full">
              <RecentActivityComponent />
            </div>
          </div>
        </div>
      </div>
  
    </>
  )
}
