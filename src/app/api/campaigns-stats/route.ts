import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { campaigns, leads } from '@/db/schema';
import { ilike, sql, eq, getTableColumns } from 'drizzle-orm';

// This API route fetches campaigns and includes a count of their associated leads.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const status = searchParams.get('status') || ''; // For filtering by status (e.g., 'Active', 'Inactive')

  try {
    // We construct a query using Drizzle's SQL helpers to get the lead count.
    const fetchedCampaigns = await db
      .select({
        // Select all columns from the campaigns table using the 'getColumns' helper
        ...getTableColumns(campaigns),
        // Create a new field 'totalLeads' by counting leads for each campaign
        totalLeads: sql<number>`count(${leads.id})`.mapWith(Number),
      })
      .from(campaigns)
      // Join with the leads table on the campaignId to link leads to their campaigns
      .leftJoin(leads, eq(campaigns.id, leads.campaignId))
      .where(ilike(campaigns.name, `%${query}%`))
      // Group the results by campaign to ensure the count is per campaign
      .groupBy(campaigns.id);

    // Filter by status in the application code.
    let finalCampaigns = fetchedCampaigns;
    if (status && status !== "All Campaigns") {
        finalCampaigns = fetchedCampaigns.filter(c => c.status === status);
    }
    
    return NextResponse.json(finalCampaigns);
  } catch (error) {
    console.error('Failed to fetch campaign stats:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign stats' }, { status: 500 });
  }
}


