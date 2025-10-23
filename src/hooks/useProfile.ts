"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { getProfiles } from "@/actions/profiles";
import {
  useProfileStore,
  useCurrentProfileId,
  useSetCurrentProfile,
  useSetCurrentProfileId,
} from "@/lib/store/useProfileStore";

// Helper function to transform Prisma profile to ProfilesDetailsProps
export const transformProfile = (profile: any): ProfilesDetailsProps => ({
  id: profile.id,
  name: profile.name,
  avatar: profile.avatar,
  isAdmin: profile.isAdmin,
  assetId: profile.assetId ?? undefined,
  details: profile.details
    ? {
        id: profile.details.id,
        profileId: profile.details.profileId,
        summary: profile.details.summary ?? undefined,
        resume: profile.details.resume ?? undefined,
        bannerUrl: profile.details.bannerUrl ?? undefined,
        assetId: profile.details.assetId ?? undefined,
      }
    : undefined,
});

// SWR hook for fetching profiles using server action
export const useProfilesData = () => {
  const { data, error, isLoading, mutate } = useSWR(
    ["profiles"],
    async () => {
      const result = await getProfiles();
      if (!result.success || !result.profiles) {
        throw new Error(result.error || "Failed to fetch profiles");
      }
      return result.profiles;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60, // 1 hour cache
      onError: (err) => console.error("Error fetching profiles:", err),
    }
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    mutate,
  };
};

// Hook that syncs profiles data with the store and manages current profile
export const useProfileData = () => {
  const { data: profiles, isLoading, error, mutate } = useProfilesData();
  const currentProfileId = useCurrentProfileId();
  const setCurrentProfile = useSetCurrentProfile();
  const setCurrentProfileId = useSetCurrentProfileId();
  const reset = useProfileStore((state) => state.reset);

  useEffect(() => {
    if (profiles.length > 0 && !currentProfileId) {
      // Set default profile if none selected
      const transformedProfile = transformProfile(profiles[0]);
      setCurrentProfile(transformedProfile);
      setCurrentProfileId(transformedProfile.id);
    } else if (currentProfileId) {
      // Find and set current profile if ID exists
      const profile = profiles.find((p) => p.id === currentProfileId);
      if (profile) {
        const transformedProfile = transformProfile(profile);
        setCurrentProfile(transformedProfile);
      }
    }
  }, [profiles, currentProfileId, setCurrentProfile, setCurrentProfileId]);

  return {
    profiles,
    isLoading,
    error,
    mutate,
    reset,
  };
};
