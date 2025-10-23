// components/ProfileCard.tsx
import Image from "next/image";

interface ProfileCardProps {
  profile: ProfilesDetailsProps;
  onClick: (profile: ProfilesDetailsProps) => void;
  isActive?: boolean;
}

const ProfileCard = ({
  profile,
  onClick,
  isActive = false,
}: ProfileCardProps) => (
  <div
    onClick={() => onClick(profile)}
    className={`group relative cursor-pointer transition-transform hover:scale-105 ${
      isActive ? "ring-2 ring-white" : ""
    }`}
  >
    <div className="w-[140px] mx-auto">
      <div className="w-[140px] h-[140px] rounded-md flex items-center justify-center border-2 overflow-hidden relative border-transparent group-hover:border-white">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={140}
          height={140}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      <div className="line-clamp-2 mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
        {profile.name}
      </div>
    </div>
  </div>
);

export default ProfileCard;
