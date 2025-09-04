import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { users } from "@/db/schema";
import { google as googleProvider } from "better-auth/social-providers";
import { toNextJsHandler } from "better-auth/next-js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

// Runtime validation for optional Google provider environment variables
const EnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, { message: "GOOGLE_CLIENT_ID is required" }).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "GOOGLE_CLIENT_SECRET is required" }).optional(),
});

const ParsedEnv = EnvSchema.safeParse(process.env);
if (!ParsedEnv.success) {
  // go through this, maybe find a way better to handle
  console.warn("Google OAuth env vars missing or invalid. Google provider will be disabled.");
}

export const auth = betterAuth({
  // Configure database via Drizzle adapter
  database: drizzleAdapter(db as unknown as Record<string, unknown>, {
    provider: "pg",
    usePlural: true,
  }),
  // Built-in email/password auth with sane defaults
  emailAndPassword: {
    enabled: true,
    password: {
      async hash(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      },
      async verify({ password, hash }: { password: string; hash: string }) {
        return bcrypt.compare(password, hash);
      },
    },
  },
  socialProviders:
    ParsedEnv.success && ParsedEnv.data.GOOGLE_CLIENT_ID && ParsedEnv.data.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: ParsedEnv.data.GOOGLE_CLIENT_ID,
            clientSecret: ParsedEnv.data.GOOGLE_CLIENT_SECRET,
          },
        }
      : {},
});

// Next.js route handlers
export const handlers = toNextJsHandler(auth);