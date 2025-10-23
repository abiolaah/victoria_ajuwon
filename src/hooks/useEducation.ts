"use client";

import useSWR from "swr";
import { getEducations, getEducationsByProfileId } from "@/actions/eductation";

export const useEducation = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? ["educationById", profileId] : ["allEducation"],
    async () => {
      const response = profileId
        ? await getEducationsByProfileId(profileId)
        : await getEducations();
      if (!response.success)
        throw new Error(response.error || "Failed to fetch projects");
      return response.educations;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60, // 1 hour cache
    }
  );

  return {
    allEducation: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
