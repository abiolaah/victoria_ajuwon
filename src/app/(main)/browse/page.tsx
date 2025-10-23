"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Billboard from "@/components/main/billboard";
import Card from "@/components/main/card";
import Navbar from "@/components/main/nav-bar";

import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from "@/components/main/info-modal";
import { useCurrentProfile } from "@/lib/store/useProfileStore";
import { useProfileSkills } from "@/hooks/useSkills";
import { useProjects } from "@/hooks/useProjects";

const Browse = () => {
  const { isOpen, closeModal } = useInfoModal();
  const currentProfile = useCurrentProfile();
  const { profileSkills: skills } = useProfileSkills(currentProfile?.id || "");
  const { projects } = useProjects(currentProfile?.id || "");

  // Filter projects and skills based on profile
  const isDeveloperProfile = currentProfile?.name.includes("Developer");
  const isTesterProfile = currentProfile?.name.includes("Tester");
  const isAdventurerProfile = currentProfile?.name === "Adventurer";

  const profileProjects = projects.slice(0, 5);

  // Get profile-specific skills
  const profileSkills = skills
    .filter((skill) => {
      if (isAdventurerProfile) return true;
      if (isDeveloperProfile) return skill.category !== "Testing";
      if (isTesterProfile) return skill.category === "Testing";
      return true;
    })
    .slice(0, 5);

  // Type the filtered data
  const typedSkills = profileSkills.map((skill) => ({
    ...skill,
    variant: "skill" as const,
  }));

  const typedProjects = profileProjects.map((project) => ({
    ...project,
    variant: "project" as const,
  }));

  const renderList = ({ title, data }: { title: string; data: Items[] }) => {
    return (
      <>
        <div className="w-8 flex flex-row items-center justify- gap-3">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-12">
            {title}
          </h2>
          <Link
            href={`/browse/${title.toLowerCase() === "projects" ? "projects-list" : "skills-list"}`}
          >
            <ChevronRight className="text-white" size={30} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-0.5 md:gap-2">
          {data.map((item) => (
            <div key={item.id} className="w-[16vw] netflix-card-container">
              {item.variant === "project" ? (
                <Card
                  data={item}
                  dataType="project"
                  profileId={currentProfile?.id}
                />
              ) : (
                <Card
                  data={item}
                  dataType="skill"
                  profileId={currentProfile?.id}
                />
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard
        profile={currentProfile?.name || ""}
        summary={currentProfile?.details?.summary || ""}
        videoUrl={currentProfile?.details?.bannerUrl || ""}
        resume={currentProfile?.details?.resume || ""}
      />
      <div className="pb-40">
        <div className="px-4 md:px-6 pt-10">
          {renderList({ title: "Skills", data: typedSkills })}
          <div className="mt-6 mb-6" />
          {renderList({ title: "Projects", data: typedProjects })}
        </div>
      </div>
    </>
  );
};

export default Browse;
