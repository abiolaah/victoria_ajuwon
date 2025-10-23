"use client";

import useSWR from "swr";
import {
  getProjectById,
  getProjects,
  getProjectsByProfileId,
} from "@/actions/projects";

export const useProjects = (profileId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    profileId ? ["projectsByProfileId", profileId] : ["allProjects"],
    async () => {
      const response = profileId
        ? await getProjectsByProfileId(profileId)
        : await getProjects();
      if (!response.success)
        throw new Error(response.error || "Failed to fetch projects");
      return response.projects;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60, // 1 hour cache
    }
  );

  return {
    projects: data ?? [],
    isLoading,
    error,
    mutate,
  };
};

export const useProject = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["project", id] : null,
    async () => {
      const response = await getProjectById(id);
      if (!response.success)
        throw new Error(
          response.message || response.error || "Failed to fetch project"
        );
      return response.project;
    }
  );

  return {
    project: data,
    isLoading,
    error,
    mutate,
  };
};
