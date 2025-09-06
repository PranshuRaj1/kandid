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
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>

  </BreadcrumbList>
</Breadcrumb>
    <div className="min-h-screen bg-gray-50 py-1 pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-6 ">
            <CampaignsComponent />
            <LinkedInAccountsComponent />
          </div>

          {/* Right column */}
          <div className="h-full">
            <RecentActivityComponent />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
