"use client";

import React from "react";

import InfoModal from "@/components/main/info-modal";
import List from "@/components/main/list";
import Navbar from "@/components/main/nav-bar";

import useInfoModal from "@/hooks/useInfoModal";
import { useCurrentProfile } from "@/lib/store/useProfileStore";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";

const ProjectsList = () => {
  const { isOpen, closeModal } = useInfoModal();
  const currentProfile = useCurrentProfile();
  const { projects } = useProjects(currentProfile?.id || "");
  const { skills } = useSkills();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="relative h-[6vw]" />
      <div className="pb-20">
        <div className="w-full flex flex-col justify-between">
          <List
            type="project"
            items={projects}
            skills={skills}
            profileId={currentProfile?.id}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsList;
