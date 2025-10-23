"use client";
import React from "react";

import InfoModal from "@/components/main/info-modal";
import List from "@/components/main/list";
import Navbar from "@/components/main/nav-bar";

import useInfoModal from "@/hooks/useInfoModal";
import { useCurrentProfile } from "@/lib/store/useProfileStore";
import { useProfileSkills } from "@/hooks/useSkills";

const SkillsList = () => {
  const { isOpen, closeModal } = useInfoModal();
  const currentProfile = useCurrentProfile();
  const { profileSkills: allSkills } = useProfileSkills(
    currentProfile?.id || ""
  );

  const coreSkills = allSkills.filter(
    (skill) => skill.category === "Core_Competencies"
  );
  const programmingLangSkills = allSkills.filter(
    (skill) => skill.category === "Programming_Language"
  );
  const frontendSkills = allSkills.filter(
    (skill) => skill.category === "Frontend"
  );
  const backendSkills = allSkills.filter(
    (skill) => skill.category === "Backend"
  );
  const databaseSkills = allSkills.filter(
    (skill) => skill.category === "Database"
  );
  const testingSkills = allSkills.filter(
    (skill) => skill.category === "Testing"
  );
  const devOpsSkills = allSkills.filter(
    (skill) => skill.category === "Cloud_Devops"
  );
  const practicesSkills = allSkills.filter(
    (skill) => skill.category === "Practices"
  );

  // Profile-specific skill groups
  let primarySkills: SkillsProps[] = [];
  let secondarySkills: SkillsProps[] = [];

  const isDeveloperProfile = currentProfile?.name.includes("Developer");
  const isTesterProfile = currentProfile?.name.includes("Tester");
  const isAdventurerProfile = currentProfile?.name === "Adventurer";

  if (isDeveloperProfile || isAdventurerProfile) {
    primarySkills = [
      ...programmingLangSkills,
      ...coreSkills,
      ...frontendSkills,
      ...backendSkills,
      ...databaseSkills,
      ...devOpsSkills,
      ...practicesSkills,
    ];
    secondarySkills = [...testingSkills];
  } else if (isTesterProfile) {
    primarySkills = [
      ...programmingLangSkills,
      ...coreSkills,
      ...testingSkills,
      ...practicesSkills,
    ];
    secondarySkills = [
      ...frontendSkills,
      ...backendSkills,
      ...databaseSkills,
      ...devOpsSkills,
    ];
  }

  // For Adventurer, show all skills without specific ordering
  const skillGroups = isAdventurerProfile
    ? [
        { title: "All Skills", items: allSkills },
        { title: "Programming Language", items: allSkills },
        { title: "Frontend", items: frontendSkills },
        { title: "Backend", items: backendSkills },
        { title: "Databases", items: databaseSkills },
        { title: "Testing", items: testingSkills },
        { title: "Cloud & Devops", items: devOpsSkills },
        { title: "Practices", items: practicesSkills },
        { title: "Core Competencies", items: coreSkills },
      ]
    : [
        {
          title: isDeveloperProfile ? "Development Skills" : "Testing Skills",
          items: primarySkills,
        },
        {
          title: isDeveloperProfile ? "Testing Skills" : "Development Skills",
          items: secondarySkills,
        },
        { title: "Core Competencies", items: coreSkills },
      ];

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div className="pt-25 pb-5">
        <div className="w-full flex-col justify-between">
          {skillGroups.map((group) => (
            <List
              key={group.title}
              title={group.title}
              items={group.items}
              type="skill"
              profileId={currentProfile?.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillsList;
