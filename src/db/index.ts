
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // Import your schema

// Ensure the DATABASE_URL is set in your environment variables.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// low-level connection to your database.
const client = new Pool({ connectionString: process.env.DATABASE_URL! });

// Drizzle instance and pass it the client and your schema.
// This gives you the fully-typed `db` object to use throughout your app.
export const db = drizzle(client, { schema });