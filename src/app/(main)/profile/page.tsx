"use client";
import ProfileCard from "@/components/main/profile-card";
import { useProfilesData } from "@/hooks/useProfile";
import {
  useCurrentProfile,
  useSetCurrentProfile,
} from "@/lib/store/useProfileStore";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: profiles, isLoading, error } = useProfilesData();

  // ✅ Get state from Zustand store
  const currentProfile = useCurrentProfile();
  const setCurrentProfile = useSetCurrentProfile();

  const handleProfileClick = (profile: ProfilesDetailsProps) => {
    console.log("Handle Profile Click:", profile);
    setCurrentProfile(profile);
    if (profile.name === "Admin") {
      if (session?.user?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/auth/signin");
      }
    } else {
      router.replace("/browse?profileSwitch=true");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading profiles
      </div>
    );
  }

  const profilesWithoutAdmin = profiles?.filter(
    (profile) => profile.name !== "Admin"
  );

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is Looking?
        </h1>
        <p className="text-lg md:text-xl text-white text-center">
          Select a profile based on what role you want me to take on.
        </p>
        <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
          {session?.user?.isAdmin
            ? profiles?.map((profile: ProfilesDetailsProps) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={handleProfileClick}
                  isActive={currentProfile?.id === profile.id}
                />
              ))
            : profilesWithoutAdmin?.map((profile: ProfilesDetailsProps) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={handleProfileClick}
                  isActive={currentProfile?.id === profile.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
