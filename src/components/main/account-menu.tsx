import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DEFAULT_PROFILE_AVATAR } from "@/lib/data";
import { CircleArrowLeft, LogOut, User } from "lucide-react";
import { useProfilesData } from "@/hooks/useProfile";
import { useSession, signOut } from "@/lib/auth-client";

import {
  useCurrentProfile,
  useSetCurrentProfile,
} from "@/lib/store/useProfileStore";

interface AccountMenuProp {
  visible?: boolean;
}

const signedInValue = () => {
  return Math.random() > 0.5;
};

const AccountMenu: React.FC<AccountMenuProp> = ({ visible }) => {
  const isSignedIn = signedInValue();
  const router = useRouter();
  const { data: profiles, isLoading: profilesLoading } = useProfilesData();
  const currentProfile = useCurrentProfile();
  const setCurrentProfile = useSetCurrentProfile();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileClick = async (profile: ProfilesDetailsProps) => {
    try {
      setIsLoading(true);

      // First update the profile ID
      console.log(profile.id);

      // Set the current profile in the store
      setCurrentProfile(profile);

      if (profile.name === "Admin") {
        window.location.href = "/admin?profileSwitch=true";
      } else {
        // Then navigate with the profile switch parameter
        // Use window.location for a full page reload to ensure clean state
        window.location.href = "/browse?profileSwitch=true";
      }
    } catch (error) {
      console.error("Error handling profile click:", error);
      setIsLoading(false);
    }
  };

  const logOut = () => {
    console.log("Sign out clicked");
  };

  // use effect to close the menu when the route changes

  if (!visible && !isLoading) return null;

  // Get first profile as current profile
  const remainingProfiles = profiles.filter(
    (profile) => profile.id !== currentProfile?.id
  );
  const otherProfiles = remainingProfiles.filter(
    (profile) => profile.name !== "Admin"
  );

  if (isLoading || profilesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div
          onClick={() => router.push("/browse")}
          className="px-3 group/item flex flex-row gap-3 items-center w-full cursor-pointer"
        >
          {currentProfile && (
            <>
              <Image
                className="w-8 rounded-md"
                src={currentProfile.avatar}
                width={30}
                height={30}
                alt={currentProfile.name}
              />
              <p className="text-white text-sm group-hover/item:underline">
                {currentProfile?.name}
              </p>
            </>
          )}
        </div>
        {/* Remaining Profile list */}
        <div className="">
          {isSignedIn
            ? remainingProfiles.map((profile: ProfilesDetailsProps) => (
                <div
                  key={profile.id}
                  onClick={() => handleProfileClick(profile)}
                  className="px-3 group/item flex flex-row gap-4 items-center w-full cursor-pointer py-2 hover:bg-zinc-800"
                >
                  <Image
                    className="w-8 rounded-md"
                    src={profile.avatar || DEFAULT_PROFILE_AVATAR}
                    width={30}
                    height={30}
                    alt={profile.name}
                  />
                  <p className="text-white text-sm group-hover/item:underline">
                    {profile?.name}
                  </p>
                </div>
              ))
            : otherProfiles.map((profile: ProfilesDetailsProps) => (
                <div
                  key={profile.id}
                  onClick={() => handleProfileClick(profile)}
                  className="px-3 group/item flex flex-row gap-4 items-center w-full cursor-pointer py-2 hover:bg-zinc-800"
                >
                  <Image
                    className="w-8 rounded-md"
                    src={profile.avatar || DEFAULT_PROFILE_AVATAR}
                    width={30}
                    height={30}
                    alt={profile.name}
                  />
                  <p className="text-white text-sm group-hover/item:underline">
                    {profile?.name}
                  </p>
                </div>
              ))}
        </div>
        {/* Account and Manage Profiles */}
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div className="flex flex-col gap-2">
          {isSignedIn && (
            <div
              onClick={() => router.push("/admin/account/profile")}
              className="px-3 text-center text-white text-sm hover:underline flex flex-row gap-4 items-center cursor-pointer py-2 hover:bg-zinc-800"
            >
              <User className="text-white" size={30} />
              Profiles
            </div>
          )}

          <div
            onClick={() => router.push("/profile")}
            className="px-3 text-center text-white text-sm hover:underline flex flex-row gap-4 items-center cursor-pointer py-2 hover:bg-zinc-800"
          >
            <CircleArrowLeft className="text-white" size={30} />
            Back to Profiles
          </div>
        </div>

        {isSignedIn && (
          <>
            <hr className="bg-gray-600 border-0 h-px my-4" />
            <div
              onClick={() => logOut()}
              className="px-3 text-center text-white text-sm hover:underline flex flex-row gap-4 items-center"
            >
              <LogOut className="text-white" size={30} />
              Sign out
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountMenu;
