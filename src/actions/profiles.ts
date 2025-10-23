"use server";

import { prisma } from "@/lib/db";
import { profileFormSchema, ProfileFormSchema } from "@/types/profileSchema";

//
// ✅ Fetch Profiles
//
export const getProfiles = async (): Promise<{
  success: boolean;
  profiles: ProfilesDetailsProps[] | null;
  error?: string;
}> => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { details: true },
    });

    const formattedProfiles: ProfilesDetailsProps[] = profiles.map((p) => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      isAdmin: p.isAdmin,
      assetId: p.assetId,
      details: p.details
        ? {
            id: p.details.id,
            profileId: p.details.profileId,
            summary: p.details.summary,
            resume: p.details.resume,
            bannerUrl: p.details.bannerUrl,
            assetId: p.details.assetId,
          }
        : null,
    }));

    return { success: true, profiles: formattedProfiles };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Error fetching profiles", profiles: null };
  }
};

//
// ✅ Add Profile (with schema validation)
//
export const addProfile = async (
  rawValues: unknown
): Promise<
  | { success: true; newProfile: ProfilesDetailsProps }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
> => {
  // 🔹 1. Validate input using Zod
  const parsed = profileFormSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid profile data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const values = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newProfile = await tx.profile.create({
        data: {
          name: values.name,
          avatar: values.avatar,
          isAdmin: values.isAdmin,
          assetId: values.avatarAssetId || null,
        },
      });

      if (values.isAdmin) {
        return { newProfile, newProfileDetails: null };
      }

      const newProfileDetails = await tx.profileDetails.create({
        data: {
          profileId: newProfile.id,
          summary: values.summary || "",
          resume: values.resume || "",
          bannerUrl: values.bannerUrl || "",
          assetId: values.bannerAssetId || null,
        },
      });

      return { newProfile, newProfileDetails };
    });

    const { newProfile, newProfileDetails } = result;

    const formatted: ProfilesDetailsProps = {
      id: newProfile.id,
      name: newProfile.name,
      avatar: newProfile.avatar,
      isAdmin: newProfile.isAdmin,
      assetId: newProfile.assetId,
      details: newProfileDetails
        ? {
            id: newProfileDetails.id,
            profileId: newProfileDetails.profileId,
            summary: newProfileDetails.summary,
            resume: newProfileDetails.resume,
            bannerUrl: newProfileDetails.bannerUrl,
            assetId: newProfileDetails.assetId,
          }
        : null,
    };

    return { success: true, newProfile: formatted };
  } catch (error) {
    console.error("Error adding profile:", error);
    return { success: false, error: "Failed to add profile" };
  }
};

//
// ✅ Update Profile (with schema validation)
//
export const updateProfile = async (
  profileId: string,
  rawValues: unknown
): Promise<
  | { success: true; updatedProfile: ProfilesDetailsProps }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }
> => {
  // 🔹 1. Validate input
  const parsed = profileFormSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid profile data",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const values = parsed.data;

  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!existingProfile) {
      return { success: false, error: "Profile not found" };
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedProfile = await tx.profile.update({
        where: { id: profileId },
        data: {
          name: values.name,
          avatar: values.avatar,
          isAdmin: values.isAdmin,
          assetId: values.avatarAssetId || null,
        },
      });

      let updatedDetails = null;

      if (values.isAdmin) {
        await tx.profileDetails.deleteMany({ where: { profileId } });
      } else {
        updatedDetails = await tx.profileDetails.upsert({
          where: { profileId },
          update: {
            summary: values.summary || "",
            resume: values.resume || "",
            bannerUrl: values.bannerUrl || "",
            assetId: values.bannerAssetId || null,
          },
          create: {
            profileId,
            summary: values.summary || "",
            resume: values.resume || "",
            bannerUrl: values.bannerUrl || "",
            assetId: values.bannerAssetId || null,
          },
        });
      }

      return { updatedProfile, updatedDetails };
    });

    const { updatedProfile, updatedDetails } = result;

    const formatted: ProfilesDetailsProps = {
      id: updatedProfile.id,
      name: updatedProfile.name,
      avatar: updatedProfile.avatar,
      isAdmin: updatedProfile.isAdmin,
      assetId: updatedProfile.assetId,
      details: updatedDetails
        ? {
            id: updatedDetails.id,
            profileId: updatedDetails.profileId,
            summary: updatedDetails.summary,
            resume: updatedDetails.resume,
            bannerUrl: updatedDetails.bannerUrl,
            assetId: updatedDetails.assetId,
          }
        : null,
    };

    return { success: true, updatedProfile: formatted };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
};

//
// ✅ Delete Profile
//
export const deleteProfile = async (
  profileId: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!existingProfile) {
      return { success: false, error: "Profile not found" };
    }

    await prisma.profile.delete({ where: { id: profileId } });

    return { success: true, message: "Profile deleted successfully!" };
  } catch (error) {
    console.error("Error deleting profile:", error);
    return { success: false, error: "Failed to delete profile" };
  }
};
