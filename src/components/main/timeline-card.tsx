import Image from "next/image";
import type { ReactNode } from "react";

interface TimelineCardProps {
  title: string;
  subtitle: string;
  technologies?: string;
  imageUrl?: string;
  achievements: string[];
  startDate?: string;
  endDate?: string;
  icon: ReactNode;
  type: "work" | "education";
}

export function TimelineCard({
  title,
  subtitle,
  technologies,
  imageUrl,
  achievements,
  startDate,
  endDate,
  type,
}: TimelineCardProps) {
  const bgColor = type === "work" ? "bg-blue-500" : "bg-pink-200";
  const textColor =
    type === "work" && !title.includes("I") ? "text-black" : "text-black";

  return (
    <div
      className={`rounded-lg p-5 ${bgColor} ${textColor} shadow-md w-full flex flex-row justify-between`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">
            {title} {type === "work" ? "🚀" : "🎓"}
          </h3>
          <p className="font-medium">{subtitle}</p>
        </div>

        {technologies && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">🛠️</span>
            <p className="text-sm">{technologies}</p>
          </div>
        )}

        <div className="mt-2 space-y-1">
          {achievements.map((achievement, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className="text-sm">⭐</span>
              <span className="text-sm">{achievement}</span>
            </p>
          ))}
        </div>

        {startDate && endDate && (
          <p className="text-sm mt-2 opacity-80">
            <span className="font-bold mr-2">{startDate || ""}</span>
            <span>-</span>
            <span className="font-bold ml-2">{endDate || ""}</span>
          </p>
        )}
      </div>
      <div className="rounded-3xl">
        <Image
          src={
            imageUrl ||
            "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg"
          }
          alt="Man on a street"
          width={100}
          height={100}
          className="object-fill rounded-full"
        />
      </div>
    </div>
  );
}
