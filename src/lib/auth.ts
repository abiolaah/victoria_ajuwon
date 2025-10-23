import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false, // Disable password authentication
  },
  email: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, token, url }) => {
      // This will be used for OTP sending
      console.log(`OTP for ${user.email}: ${token}`);
      // In production, integrate with your email service here
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      isAdmin: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
    },
  },
  plugins: [],
  trustedOrigins: [
    "http://localhost:3000",
    "https://your-domain.com", // Replace with your production domain
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
