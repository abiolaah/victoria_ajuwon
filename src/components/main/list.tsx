"use client";

import React from "react";
import Card from "@/components/main/card";

interface ListProps {
  title?: string;
  items: (ProjectsProps | SkillsProps)[];
  type: "project" | "skill";
  profileId?: string;
  skills?: SkillsProps[]; // Add skills prop
}

const List: React.FC<ListProps> = ({
  title,
  items,
  type,
  profileId,
  skills,
}) => {
  if (items.length <= 0) {
    return null;
  }
  return (
    <div className="relative mt-8 list-container">
      {/* Title and section area - only shown for skills */}
      {type === "skill" && title && (
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-12">
          {title}
        </h2>
      )}

      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-5 sm:gap-0.5 md:gap-2 px-4 md:px-12">
        {items.map((item) => (
          <div key={item.id} className="w-full card-container">
            <Card
              data={item}
              dataType={type}
              profileId={profileId}
              skills={skills}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;
