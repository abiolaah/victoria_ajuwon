"use client";
import React, { useState, useRef } from "react";

import Image from "next/image";

import { useExpandedPosition } from "@/lib/utils/useExpandedPosition";
import useInfoModal from "@/hooks/useInfoModal";
import { getSkillTitle, getSkillTitleById } from "@/lib/utils";

interface CardProps {
  data: ProjectsProps | SkillsProps;
  dataType: "project" | "skill";
  profileId?: string;
  skills?: SkillsProps[];
}

const Card: React.FC<CardProps> = ({ data, dataType, profileId, skills }) => {
  const expandedRef = useRef<HTMLDivElement>(null);
  const { getPosition } = useExpandedPosition(expandedRef);
  const { openModal } = useInfoModal();
  const [isHovered, setIsHovered] = useState(false);

  const refPosition = getPosition();

  // Calculate position adjustments for the expanded card
  const getExpandedCardStyle = () => {
    const baseStyle = {
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto" as const,
    };

    return {
      ...baseStyle,
      left: refPosition.left,
      top: refPosition.top,
      transform: "scale(1.2)",
      width: "22vw",
    };
  };

  const handleOpenModal = () => {
    const itemType: "project" | "skill" =
      dataType === "project" ? "project" : "skill";
    openModal(data?.id, itemType, profileId);
    setIsHovered(false);
  };

  // Type guard to check if data is ProjectsProps
  const isProject = (
    item: ProjectsProps | SkillsProps
  ): item is ProjectsProps => {
    return dataType === "project";
  };

  // Helper function to get skill title
  const getSkillTitle = (skillId: string): string => {
    if (!skills) return skillId;
    const skill = getSkillTitleById(skillId, skills);
    return skill || "";
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "transform 0.3s ease, z-index 0s",
        zIndex: isHovered ? 1000 : 1,
        isolation: isHovered ? "isolate" : "auto",
      }}
      ref={expandedRef}
    >
      {/* Base Card */}
      <div className="relative h-[12vw] w-[16vw] card-wrapper">
        <div
          className={`relative w-full h-full rounded-md overflow-hidden transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="cursor-pointer object-cover shadow-xl rounded-md"
            onError={(e) => {
              console.error(
                "Error loading image for",
                data.title,
                ":",
                data.imageUrl
              );
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
          />
        </div>
      </div>

      {/* Expanded Card on Hover */}
      {isHovered && (
        <div className="expanded-card z-100" style={getExpandedCardStyle()}>
          <div
            onClick={handleOpenModal}
            className="relative w-full h-[8vw] rounded-t-md overflow-hidden mt-5"
          >
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="cursor-pointer object-cover shadow-xl w-full h-full"
              onError={(e) => {
                console.error(
                  "Error loading image for",
                  data.title,
                  ":",
                  data.imageUrl
                );
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              }}
            />
          </div>

          {/* Content section */}
          <div className="bg-zinc-800 p-4 rounded-b-md">
            {/* Project-specific content */}
            {isProject(data) && (
              <>
                {/* Tech Stacks */}
                {data.techStack.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-white font-medium text-sm mb-1">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.techStack.map((t, i) => (
                        <span key={t.id} className="text-white/70 text-xs">
                          {i > 0 && "•"} {getSkillTitle(t.skillId)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-white font-medium text-sm mb-1">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((s, i) => (
                        <span key={s.id} className="text-white/70 text-xs">
                          {i > 0 && "•"} {getSkillTitle(s.skillId)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Skill-specific content */}
            {!isProject(data) && (
              <div
                onClick={handleOpenModal}
                className="flex flex-col justify-between gap-0.5"
              >
                {/* Type */}
                <h5 className="text-white font-medium text-sm mb-1">
                  Type:{data.type}
                </h5>
                {/* Category if exists */}
                {data.category && (
                  <h5 className="text-white font-medium text-sm mb-1">
                    Category: {getSkillTitle(data.category)}
                  </h5>
                )}
              </div>
            )}

            {/* Title - common for both */}
            <h3 className="text-white font-semibold text-normal mb-3">
              {data.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
