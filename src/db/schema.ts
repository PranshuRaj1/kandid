import { pgTable, pgEnum, text, varchar, timestamp, serial, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// pgEnum for predefined sets of values (statuses).
export const campaignStatusEnum = pgEnum('campaign_status', ['Draft', 'Active', 'Paused', 'Completed']);
export const leadStatusEnum = pgEnum('lead_status', ['Pending', 'Contacted', 'Responded', 'Converted']);

// leads references compaign table

// compaign table
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  status: campaignStatusEnum('status').default('Draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// leads table
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  company: varchar('company', { length: 256 }),
  status: leadStatusEnum('status').default('Pending').notNull(),
  lastContactedAt: timestamp('last_contacted_at'),
  
  // This is the foreign key relationship.
  // A lead MUST belong to a campaign.
  campaignId: integer('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }), //  if a campaign is deleted, its leads are also deleted.
});


// Realtionships

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  // A campaign can have MANY leads.
  leads: many(leads),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  // A lead belongs to ONE campaign.
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
}));