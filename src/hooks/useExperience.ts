"use client";

import useSWR from "swr";
import {
  getExperiences,
  getExperiencesByProfileId,
} from "@/actions/experiences";

export const useExperiences = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? ["experiencesByProfileId", profileId] : ["allExperiences"],
    async () => {
      const response = profileId
        ? await getExperiencesByProfileId(profileId)
        : await getExperiences();
      if (!response.success)
        throw new Error(response.error || "Failed to fetch projects");
      return response.experiences;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60, // 1 hour cache
    }
  );

  return {
    experiences: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
