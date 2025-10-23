#!/usr/bin/env tsx

import { createSingleAdminUser, checkAdminExists } from "./src/actions/auth";
import { prisma } from "./src/lib/db";

async function setupSingleAdmin() {
  console.log("Setting up single admin user...");

  try {
    // Check if admin already exists
    const adminCheck = await checkAdminExists();

    if (adminCheck.exists) {
      console.log("✅ Admin user already exists!");
      console.log("📧 Email:", adminCheck.admin?.email);
      console.log("👤 Name:", adminCheck.admin?.name);
      return;
    }

    // Get admin email from environment or prompt
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    console.log(`Creating admin user with email: ${adminEmail}`);

    const result = await createSingleAdminUser(adminEmail);

    if (result.success) {
      console.log("✅ Single admin user created successfully!");
      console.log("📧 Email:", result.user.email);
      console.log("👤 Name:", result.user.name);
      console.log("🔐 Authentication: Email + OTP");
      console.log("\n⚠️  Make sure to set ADMIN_EMAIL environment variable!");
    } else {
      console.log("❌ Failed to create admin user:", result.error);
    }
  } catch (error) {
    console.error("❌ Error setting up admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

setupSingleAdmin();
