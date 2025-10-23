"use server";

import { prisma } from "@/lib/db";
import { profileFormSchema, ProfileFormSchema } from "@/types/profileSchema";

//
// ✅ Fetch All Experience
//
export const getExperiences = async (): Promise<{
  success: boolean;
  experiences: ExperienceProps[] | null;
  error?: string;
}> => {
  try {
    const allExperience = await prisma.experience.findMany({
      include: {
        profile: true,
        descriptions: true,
      },
    });

    const formattedExperience: ExperienceProps[] = allExperience.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      startDate: e.startDate,
      endDate: e.endDate,
      assetId: e.assetId || undefined,
      imageUrl: e.imageUrl,
      description: e.descriptions.map((d) => d.content),
    }));

    return { success: true, experiences: formattedExperience };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return {
      success: false,
      error: "Error fetching profiles",
      experiences: null,
    };
  }
};

//
// ✅ Fetch All Experience by ProfileId
//
export const getExperiencesByProfileId = async (
  profileId: string
): Promise<{
  success: boolean;
  experiences: ExperienceProps[] | null;
  error?: string;
}> => {
  try {
    const allExperience = await prisma.experience.findMany({
      where: { profileId },
      include: {
        profile: true,
        descriptions: true,
      },
    });

    const formattedExperience: ExperienceProps[] = allExperience.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      startDate: e.startDate,
      endDate: e.endDate,
      assetId: e.assetId || undefined,
      imageUrl: e.imageUrl,
      description: e.descriptions.map((d) => d.content),
    }));

    return { success: true, experiences: formattedExperience };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return {
      success: false,
      error: "Error fetching profiles",
      experiences: null,
    };
  }
};

//
// ✅ Fetch Experience by Id
//
export const getProjectById = async (
  id: string
): Promise<{
  success: boolean;
  project: ProjectsProps | null;
  error?: string;
  message?: string;
}> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        profile: true,
        skills: true,
        techStack: true,
        media: true,
      },
    });

    if (!project) {
      return {
        success: false,
        project: null,
        message: "No such project found",
      };
    }

    const formattedProject: ProjectsProps = {
      id: project.id,
      profileId: project.profileId,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      sourceLink: project.sourceLink,
      demoLink: project.demoLink,
      demoVideoLink: project.demoVideoLink || undefined,
      skills: project.skills,
      techStack: project.techStack,
      startDate: project.startDate || undefined,
      endDate: project.endDate || undefined,
      images: project.media || undefined,
      status: project.status || undefined,
      assetId: project.assetId || undefined,
    };

    return { success: true, project: formattedProject };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Error fetching profiles", project: null };
  }
};

//
// ✅ Add Experience (with schema validation)
//
export const addExperience = async (
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
// ✅ Update Experience (with schema validation)
//
export const updateExperience = async (
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
// ✅ Delete Experience
//
export const deleteExperience = async (
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
