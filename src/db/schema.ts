import { pgTable, pgEnum, text, varchar, timestamp, serial, integer,boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// pgEnum for predefined sets of values (statuses).
export const campaignStatusEnum = pgEnum('campaign_status', ['Draft', 'Active', 'Paused', 'Completed']);
export const leadStatusEnum = pgEnum('lead_status', ['Pending', 'Contacted', 'Responded', 'Converted']);

// auth

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

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

export type Campaign = typeof campaigns.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type LeadWithCampaign = Lead & { campaign: Campaign | null };