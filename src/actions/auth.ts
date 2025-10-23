"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";

const adminEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function createSingleAdminUser(adminEmail: string) {
  try {
    const parsed = adminEmailSchema.safeParse({ email: adminEmail });

    if (!parsed.success) {
      return {
        success: false,
        error: "Invalid email address",
      };
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      return {
        success: false,
        error: "Admin user already exists",
      };
    }

    // Create single admin user
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Admin",
        isAdmin: true,
        emailVerified: true, // Set to true for OTP-based auth
      },
    });

    return {
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        isAdmin: admin.isAdmin,
      },
    };
  } catch (error) {
    console.error("Admin creation error:", error);
    return {
      success: false,
      error: "Failed to create admin user",
    };
  }
}

export async function checkAdminExists() {
  try {
    const admin = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    return {
      exists: !!admin,
      admin: admin
        ? {
            id: admin.id,
            email: admin.email,
            name: admin.name,
          }
        : null,
    };
  } catch (error) {
    console.error("Error checking admin:", error);
    return {
      exists: false,
      admin: null,
    };
  }
}
