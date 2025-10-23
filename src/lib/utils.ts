import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: string | Date) => {
  if (!date) return "Present";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

export const getSkillTitle = (skill: string): string => {
  let updatedTitle = "";
  if (!skill.includes("_")) {
    updatedTitle = skill;
  } else if (skill === "Cloud_Devops") {
    updatedTitle = skill
      .replace(/_/g, " & ") // replace underscores with &
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  } else {
    updatedTitle = skill
      .replace(/_/g, " ") // replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
  }
  return updatedTitle;
};

export const skillsUsageLevel = (
  profileId: string,
  profileSkillProjects: ProjectsProps[],
  profileProjects: ProjectsProps[]
): number => {
  let percentage = 0;
  if (
    !profileId ||
    profileSkillProjects.length === 0 ||
    profileProjects.length === 0
  ) {
    percentage += 0;
  }
  // TODO: Get all the project in the profile
  const totalProjects = profileProjects.length;
  // TODO: Get how many of the project uses the skill
  const projectsUsingSkills = profileSkillProjects.length;
  // return the percentage
  percentage += Math.round((projectsUsingSkills / totalProjects) * 100);

  return percentage;
};

export const skillsUsage = (
  profileSkillProjects: ProjectsProps[],
  profileProjects: ProjectsProps[]
): number => {
  let percentage = 0;
  if (profileSkillProjects.length === 0 || profileProjects.length === 0) {
    percentage += 0;
  }
  // TODO: Get all the project in the profile
  const totalProjects = profileProjects.length;
  // TODO: Get how many of the project uses the skill
  const projectsUsingSkills = profileSkillProjects.length;
  // return the percentage
  percentage += Math.round((projectsUsingSkills / totalProjects) * 100);

  return percentage;
};

export const getSkillTitleById = (
  skillId: string,
  skills: SkillsProps[]
): string => {
  return skills.find((s) => s.id === skillId)?.title || "";
};

export const getLatestEducation = (
  education: EducationProps[]
): EducationProps | undefined => {
  if (!education || education.length === 0) return undefined;

  return [...education].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  )[0];
};

export const getCurrentExperience = (
  experience: ExperienceProps[]
): ExperienceProps | undefined => {
  if (!experience || experience.length === 0) return undefined;

  // Create a copy to avoid mutating the original array
  const sorted = [...experience].sort((a, b) => {
    // Ongoing experiences (no end date) come first
    if (!a.endDate) return -1;
    if (!b.endDate) return 1;

    // Then sort by end date (most recent first)
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return sorted[0];
};
