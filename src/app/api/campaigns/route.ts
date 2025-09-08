import { db } from '@/db';
import { NextResponse } from 'next/server';

// By default, this is a dynamic route.
// We can add `export const revalidate = 60;` to cache for 60 seconds if needed.

export async function GET() {
  try {
    // Fetch all campaigns from the database
    const allCampaigns = await db.query.campaigns.findMany();
    return NextResponse.json(allCampaigns);
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    // Return an error response
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}
