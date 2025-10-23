"use client";

import useSWR from "swr";
import { getSkills, getSkillsByProfileId } from "@/actions/skills";

export const useSkills = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? ["skills", profileId] : ["skills"],
    async () => {
      const response = profileId
        ? await getSkillsByProfileId(profileId)
        : await getSkills();
      if (!response.success)
        throw new Error(response.error || "Failed to fetch projects");
      return response.skills;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60, // 1 hour cache
    }
  );

  return {
    skills: data ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useProfileSkills = (profileId: string) => {
  const { skills, isLoading, error } = useSkills(profileId);

  const profileSkills: SkillsProps[] = skills.filter((skill) =>
    skill.profiles.some((p) => p.profileId === profileId)
  );

  return {
    profileSkills,
    isLoading,
    error,
  };
};
