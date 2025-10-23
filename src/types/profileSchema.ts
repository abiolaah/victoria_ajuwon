// types/profileSchema.ts
import { z } from "zod";

export const profileFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" }),

    avatar: z
      .string()
      .trim()
      .url({ message: "A valid avatar URL is required" }),

    avatarAssetId: z.string().trim().optional().nullable(),

    isAdmin: z.boolean(),

    summary: z.string().trim().optional().nullable(),
    bannerUrl: z.string().trim().optional().nullable(),
    resume: z.string().trim().optional().nullable(),
    bannerAssetId: z.string().trim().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.isAdmin) {
      // Admins: all detail fields must be empty or null
      ["summary", "bannerUrl", "resume", "bannerAssetId"].forEach((field) => {
        const value = (data as any)[field];
        if (value && value.trim() !== "") {
          ctx.addIssue({
            code: "custom",
            message: `Admin ${field} must be empty`,
            path: [field],
          });
        }
      });
    } else {
      // Regular users
      if (!data.summary || data.summary.trim().length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "Summary must be at least 10 characters long",
          path: ["summary"],
        });
      }

      if (!data.bannerUrl) {
        ctx.addIssue({
          code: "custom",
          message: "Banner URL is required for regular profiles",
          path: ["bannerUrl"],
        });
      } else {
        try {
          new URL(data.bannerUrl);
        } catch {
          ctx.addIssue({
            code: "custom",
            message: "Banner URL must be a valid URL",
            path: ["bannerUrl"],
          });
        }
      }

      if (!data.resume) {
        ctx.addIssue({
          code: "custom",
          message: "Resume URL is required for regular profiles",
          path: ["resume"],
        });
      } else {
        try {
          new URL(data.resume);
        } catch {
          ctx.addIssue({
            code: "custom",
            message: "Resume must be a valid URL",
            path: ["resume"],
          });
        }
      }
    }
  });

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
