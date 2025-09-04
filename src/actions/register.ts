"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Schema for registration form
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1, "Name is required"),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // 1. Validate the input on the server
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields provided." };
  }

  const { email, password, name } = validatedFields.data;

  // 2. Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // 3. Check if the user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  // 4. Insert the new user into the database
  await db.insert(users).values({
    name,
    email,
    hashedPassword,
  });

  // You can add email verification logic here if needed

  return { success: "Account created successfully!" };
};