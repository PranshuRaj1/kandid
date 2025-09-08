import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { ilike } from 'drizzle-orm';

// This function handles GET requests to fetch leads with pagination and search.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');
  const query = searchParams.get('query') || '';

  try {
    // To use relations (like `.with()`), we must use Drizzle's relational query methods.
    // `db.query.leads.findMany()` is the correct method here.
    const fetchedLeads = await db.query.leads.findMany({
      limit: limit,
      offset: offset,
      // The `with` property is used inside the options object to eager-load relations.
      with: {
        campaign: true,
      },
      // We can conditionally add a `where` clause for filtering.
      where: query ? ilike(leads.name, `%${query}%`) : undefined,
    });

    // Return the fetched leads as a JSON response
    return NextResponse.json(fetchedLeads);
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

