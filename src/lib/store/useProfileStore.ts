// stores/profileStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  currentProfileId: string | null;
  currentProfile: ProfilesDetailsProps | null;
  setCurrentProfileId: (id: string | null) => void;
  setCurrentProfile: (profile: ProfilesDetailsProps | null) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      currentProfileId: null,
      currentProfile: null,
      setCurrentProfileId: (id) => set({ currentProfileId: id }),
      setCurrentProfile: (profile) => set({ currentProfile: profile }),
      reset: () => set({ currentProfileId: null, currentProfile: null }),
    }),
    {
      name: "portfolio-profile-storage",
    }
  )
);

// Individual selector hooks for better performance
export const useCurrentProfile = () =>
  useProfileStore((state) => state.currentProfile);

export const useCurrentProfileId = () =>
  useProfileStore((state) => state.currentProfileId);

export const useSetCurrentProfile = () =>
  useProfileStore((state) => state.setCurrentProfile);

export const useSetCurrentProfileId = () =>
  useProfileStore((state) => state.setCurrentProfileId);

export const useResetProfile = () => useProfileStore((state) => state.reset);
