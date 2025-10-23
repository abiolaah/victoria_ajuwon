/* eslint-disable react-hooks/exhaustive-deps */
// portfolio/InfoModal.tsx
"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { X, Youtube, Calendar, ExternalLink, Code } from "lucide-react";

import { CircularProgress } from "@/components/main/circular-progress";

import useInfoModal from "@/hooks/useInfoModal";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useProfileSkills } from "@/hooks/useSkills";
import { formatDate, getSkillTitle, skillsUsageLevel } from "@/lib/utils";
import { useProjects } from "@/hooks/useProjects";

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [isLoading, setIsLoading] = useState(false);
  const {
    itemId,
    type: storedType,
    profileId: storedProfileId,
  } = useInfoModal();
  const { profileSkills: skills } = useProfileSkills(storedProfileId || "");
  const { projects } = useProjects(storedProfileId || "");
  const [data, setData] = useState<SkillsProps | ProjectsProps | null>(null);

  //   // Get skill level for the current profile
  //   const getSkillLevelInProject = (
  //     project: ProjectsProps,
  //     skillId: string,
  //     skillType: "tech" | "regular"
  //   ): number => {
  //     if (!storedProfileId) return 0;
  //     const profileProject = projects.find(
  //       (p) => p.profileId === storedProfileId
  //     );
  //     let projectSkill: ProjectSkills;
  //     if (skillType === "regular") {
  //       projectSkill = profileProject?.skills.find(
  //         (ps) => ps.skillId === skillId
  //       );
  //     }
  //     if (skillType === "tech") {
  //       projectSkill = profileProject?.techStack.find(
  //         (pt) => pt.skillId === skillId
  //       );
  //     }
  //     return projectSkill?.level ?? 0;
  //   };

  // Mock data fetching function - replace with actual API calls
  const fetchData = useCallback(async () => {
    if (!itemId || !storedType) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (storedType === "skill") {
        // const skill = SkillsDetails.find((s) => s.id === itemId);
        const skill = skills.find((s) => s.id === itemId);
        if (skill) {
          setData(skill);
        } else {
          setData(null);
        }
      } else if (storedType === "project") {
        const project = projects.find((p) => p.id === itemId);
        if (project) {
          setData(project);
        } else {
          setData(null);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [storedType, itemId]);

  // Fetch data when modal opens or itemId changes
  useEffect(() => {
    if (visible && itemId) {
      fetchData();
    }
  }, [visible, itemId, fetchData]);

  // Sync visibility with prop
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // Type guard to check if data is ProjectsProps
  const isProject = (
    item: ProjectsProps | SkillsProps
  ): item is ProjectsProps => {
    return storedType === "project";
  };

  // Get related projects for a skill
  const getProjectsWithSkill = (skillId: string): ProjectsProps[] => {
    try {
      if (!skillId || !skills || !projects) return [];

      // Find the skill to get its title
      const skill = skills.find((s) => s.id === skillId);
      if (!skill) {
        console.warn(`Skill with ID ${skillId} not found`);
        return [];
      }

      const matchingProjects = projects.filter((project) => {
        const hasSkill = project.skills.some((ps) => ps.skillId === skillId);
        const hasTech = project.techStack.some((pt) => pt.skillId === skillId);
        return hasSkill || hasTech;
      });
      return matchingProjects;
    } catch (error) {
      console.error("Error in getProjectsWithSkill:", error);
      return [];
    }
  };

  // Get skills for a project (already included in project data)
  const getSkillsForProject = (
    project: ProjectsProps
  ): (SkillsProps & { level: number })[] => {
    // Collect all skill IDs from both skills and tech stack
    const skillIds = [
      ...project.skills.map((ps) => ps.skillId),
      ...project.techStack.map((pt) => pt.skillId),
    ];

    // Find matching skills and add their usage level
    return skills
      .filter((skill) => skillIds.includes(skill.id))
      .map((skill) => {
        // Find the usage level from either skills or techStack
        const projectSkill = project.skills.find(
          (ps) => ps.skillId === skill.id
        );
        const projectTech = project.techStack.find(
          (pt) => pt.skillId === skill.id
        );
        const usageLevel =
          projectSkill?.usageLevel || projectTech?.usageLevel || 0;

        return {
          ...skill,
          level: usageLevel,
        };
      });
  };

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  // Early return if not visible
  if (!visible) return null;

  if (isLoading) {
    return (
      <div className="z-50 transition duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
        <div className="relative w-[1200px] rounded-lg overflow-hidden">
          <div className="relative bg-zinc-900 p-10 flex justify-center items-center ">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="text-white text-xl">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    console.log("Data not found", itemId, storedType);
    return null;
  }

  // Get related data based on type
  const projectsWithSkill =
    storedType === "skill" ? getProjectsWithSkill(data.id) : [];
  const skillsForProject =
    storedType === "project" && isProject(data)
      ? getSkillsForProject(data)
      : [];

  const coreCompetencySkills = skillsForProject.filter(
    (skill) => skill.category === "Core_Competencies"
  );

  const softSkill = coreCompetencySkills.filter(
    (skill) => skill.type === "Soft"
  );
  const hardSkill = coreCompetencySkills.filter(
    (skill) => skill.type === "Hard"
  );
  const bothSkill = coreCompetencySkills.filter(
    (skill) => skill.type === "Both"
  );

  const techStackList = skillsForProject.filter(
    (tech) => tech.category !== "Core_Competencies"
  );

  const languageStack = techStackList.filter(
    (language) => language.category === "Programming_Language"
  );
  const frontendStack = techStackList.filter(
    (frontend) => frontend.category === "Frontend"
  );
  const backendStack = techStackList.filter(
    (backend) => backend.category === "Backend"
  );
  const databaseStack = techStackList.filter(
    (database) => database.category === "Database"
  );
  const othersStack = techStackList.filter(
    (other) =>
      other.category !== "Frontend" &&
      other.category !== "Backend" &&
      other.category !== "Database"
  );

  const videoContainerStyle: React.CSSProperties = {
    position: "relative",
    paddingBottom: "56.25%",
    height: 0,
    overflow: "hidden",
    marginBottom: "1rem",
  };

  const videoIframeStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  };

  const getSkillLevel = (skillId: string): number => {
    if (!storedProfileId) return 0;
    const matchingProjects = getProjectsWithSkill(skillId);
    return skillsUsageLevel(storedProfileId, matchingProjects, projects);
  };

  return (
    <div className="z-50 fixed inset-0 bg-black/80 flex justify-center items-center overflow-auto">
      {/* Modal container */}
      <div
        className={`relative w-full max-w-[900px] my-10 rounded-lg transform transition duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        } bg-linear-to-b from-zinc-900 to-zinc-950 drop-shadow-md`}
      >
        {/* Scrollable content wrapper */}
        <div className="max-h-[90vh] overflow-y-auto rounded-lg">
          {/* Hero Section */}
          <div className="relative h-72 sm:h-96 w-full">
            <Image
              src={data.imageUrl || "/placeholder.svg?height=400&width=800"}
              alt={data.title}
              fill
              className="w-full object-cover h-full"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-zinc-900/40"></div>

            {/* Close Button */}
            <div className="absolute top-3 right-3 z-20">
              <Button
                onClick={handleClose}
                className="cursor-pointer h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="text-white w-5" />
              </Button>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-zinc-900 to-transparent">
              <h1 className="text-white text-3xl font-bold">{data.title}</h1>
              {isProject(data) && (data.startDate || data.endDate) && (
                <div className="flex items-center gap-2 mt-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {formatDate(data.startDate)} - {formatDate(data.endDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {isProject(data) ? (
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b border-zinc-800">
                  <TabsList className="bg-transparent h-12 w-full my-2 p-1 flex flex-wrap gap-1">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-zinc-800 text-white data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 transition-all"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="data-[state=active]:bg-zinc-800 text-white data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 transition-all"
                    >
                      Skills & Tech
                    </TabsTrigger>
                    <TabsTrigger
                      value="media"
                      className="data-[state=active]:bg-zinc-800 text-white data-[state=active]:text-white rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 transition-all"
                    >
                      Media
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="h-auto max-h-[60vh] px-2 py-4">
                  {/* Your TabsContent sections remain unchanged */}
                  {/* ... Overview, Skills, and Media tabs ... */}
                  <TabsContent value="overview" className="mt-0">
                    {/* Project Links */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {data.sourceLink && (
                        <a
                          href={data.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md py-2 px-3 text-sm font-medium transition-colors"
                        >
                          <Code className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      {data.demoLink && (
                        <a
                          href={data.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white rounded-md py-2 px-3 text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h2 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                        About this project
                      </h2>
                      <p className="text-white/80 leading-relaxed text-sm">
                        {data.description}
                      </p>
                    </div>

                    {/* Skills List */}
                    <div className="flex flex-col gap-3 mb-6">
                      {/* Core Competency Skill */}
                      {coreCompetencySkills.length > 0 && (
                        <div className="mb-3">
                          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                            Skills Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {coreCompetencySkills.map((skill) => (
                              <Badge
                                key={skill.id}
                                variant="outline"
                                className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                              >
                                {skill.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Tech Stack Skill */}
                      {techStackList.length > 0 && (
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                            Technologies Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {techStackList.map((tech) => (
                              <Badge
                                key={tech.id}
                                variant="outline"
                                className="bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                              >
                                {tech.title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0 space-y-6">
                    {/* Core Competency Skills */}
                    {coreCompetencySkills.length > 0 && (
                      <div>
                        <h3 className="text-white text-lg uppercase font-bold mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Skills Used
                        </h3>

                        {softSkill.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Soft Skills
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {softSkill.map((skill) => (
                                <CircularProgress
                                  key={skill.id}
                                  percentage={skill.level}
                                  title={skill.title}
                                  size={80}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {hardSkill.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Hard Skills
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {hardSkill.map((skill) => (
                                <CircularProgress
                                  key={skill.id}
                                  percentage={skill.level}
                                  title={skill.title}
                                  size={80}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {bothSkill.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Other Skills
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {bothSkill.map((skill) => (
                                <CircularProgress
                                  key={skill.id}
                                  percentage={skill.level}
                                  title={skill.title}
                                  size={80}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech Stack */}
                    {techStackList.length > 0 && (
                      <div>
                        <h3 className="text-white text-lg uppercase font-bold mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Technologies Used
                        </h3>

                        {languageStack.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Programming Languages
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {languageStack.map((tech) => (
                                <CircularProgress
                                  key={tech.id}
                                  percentage={tech.level}
                                  title={tech.title}
                                  size={90}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {frontendStack.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Frontend
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {frontendStack.map((tech) => (
                                <CircularProgress
                                  key={tech.id}
                                  percentage={tech.level}
                                  title={tech.title}
                                  size={90}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {backendStack.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Backend
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {backendStack.map((tech) => (
                                <CircularProgress
                                  key={tech.id}
                                  percentage={tech.level}
                                  title={tech.title}
                                  size={90}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {databaseStack.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Database
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {databaseStack.map((tech) => (
                                <CircularProgress
                                  key={tech.id}
                                  percentage={tech.level}
                                  title={tech.title}
                                  size={90}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {othersStack.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white/80 text-base font-semibold mb-3">
                              Other Technologies
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {othersStack.map((tech) => (
                                <CircularProgress
                                  key={tech.id}
                                  percentage={tech.level}
                                  title={tech.title}
                                  size={90}
                                  titleClassName="text-xs"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="media" className="mt-0 space-y-6">
                    {/* Project banner */}
                    {data.imageUrl && (
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Project Banner
                        </h3>
                        <Image
                          src={data.imageUrl}
                          alt="Project banner"
                          width={800}
                          height={400}
                          className="object-cover group-hover:scale-105 transition duration-300 ease-out"
                        />
                      </div>
                    )}

                    {/* Demo Video */}
                    {data.demoVideoLink && (
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Demo Video
                        </h3>
                        <div
                          className="relative aspect-video bg-black rounded-md overflow-hidden cursor-pointer group"
                          onClick={() => window.open(data.demoVideoLink)}
                        >
                          <div style={videoContainerStyle}>
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(data.demoVideoLink)}`}
                              style={videoIframeStyle}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Project Demo Video"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-red-600 p-3 rounded-full">
                              <Youtube className="text-white w-8 h-8" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional Images */}
                    {data.images && data.images?.length > 0 && (
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Project Images
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {data.images.map((image, index) => (
                            <div
                              key={index}
                              className="aspect-video cursor-pointer relative group overflow-hidden rounded-md"
                            >
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`Project image ${index + 1}`}
                                fill
                                sizes="100%"
                                className="object-cover rounded-md transition-transform group-hover:scale-110 duration-300"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            ) : (
              // Skill content section
              <ScrollArea className="h-auto max-h-[70vh] px-2 py-4">
                {/* Your skill content remains unchanged */}
                <div className="flex flex-col space-y-6">
                  {/* Skill Details */}
                  <div className="flex flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                        Type
                      </h3>
                      <p className="text-white font-bold text-2xl">
                        {(data as SkillsProps).type}
                      </p>
                    </div>
                    {(data as SkillsProps).category && (
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                          Category
                        </h3>
                        <p className="text-white font-bold text-2xl">
                          {getSkillTitle(
                            (data as SkillsProps).category as string
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                      Usage
                    </h3>
                    <CircularProgress
                      percentage={getSkillLevel(
                        (data as SkillsProps).id as string
                      )}
                      title=""
                      size={100}
                      className="relative z-10"
                    />
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
                  </div>

                  {/* Projects using this skill */}
                  {projectsWithSkill.length > 0 && (
                    <div className="w-full">
                      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="h-5 w-1 bg-red-500 rounded-full"></span>
                        Projects using {data.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projectsWithSkill.map((project) => (
                          <div
                            key={project.id}
                            className="group cursor-pointer"
                          >
                            <div className="relative aspect-video overflow-hidden rounded-md">
                              <Image
                                src={
                                  project.imageUrl ||
                                  "/placeholder.svg?height=200&width=300"
                                }
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-80"></div>
                              <div className="absolute bottom-0 left-0 p-3">
                                <h4 className="text-white font-medium text-sm">
                                  {project.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
