"use server";

import { prisma } from "@/lib/db";

//
// ✅ Fetch All Skills
//
export const getSkills = async (): Promise<{
  success: boolean;
  skills: SkillsProps[] | null;
  error?: string;
}> => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        profileSkills: true,
      },
    });

    const formattedSkills: SkillsProps[] = skills.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: s.imageUrl,
      type: s.type,
      assetId: s.assetId || undefined,
      category: s.category || undefined,
      profiles: s.profileSkills,
    }));

    return { success: true, skills: formattedSkills };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Error fetching profiles", skills: null };
  }
};

//
// ✅ Fetch All Skills by ProfileId
//
export const getSkillsByProfileId = async (
  profileId: string
): Promise<{
  success: boolean;
  skills: SkillsProps[] | null;
  error?: string;
}> => {
  try {
    const skills = await prisma.skill.findMany({
      where: { profileSkills: { some: { profileId } } },
      include: {
        profileSkills: true,
      },
    });

    const formattedSkills: SkillsProps[] = skills.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: s.imageUrl,
      type: s.type,
      assetId: s.assetId || undefined,
      category: s.category || undefined,
      profiles: s.profileSkills,
    }));

    return { success: true, skills: formattedSkills };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return { success: false, error: "Error fetching profiles", skills: null };
  }
};
