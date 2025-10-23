"use client";

import React from "react";
import Navbar from "@/components/main/nav-bar";
import { TimelineCard } from "@/components/main/timeline-card";
import { useEducation } from "@/hooks/useEducation";
import { useExperiences } from "@/hooks/useExperience";
import { formatDate } from "@/lib/utils";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const Professional = () => {
  const { experiences } = useExperiences();
  const { allEducation } = useEducation();

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pb-20 pt-20 px-4 md:px-10 max-w-7xl mx-auto mt-10">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center flex flex-row items-center justify-center gap-4">
          <Calendar className="text-red-500" size={50} />
          Work Experience & Education Timeline
        </h1>

        <div className="relative w-full">
          {/* Timeline line */}
          <div className="absolute left-[20px] md:left-[30px] top-0 bottom-0 w-[2px] bg-gray-500"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((experience) => (
              <div
                key={`work-${experience.id}`}
                className="flex items-start gap-6 md:gap-10 relative"
              >
                <div className="bg-blue-500 rounded-full p-2 z-10 mt-2">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <TimelineCard
                  title={experience.role}
                  subtitle={experience.company}
                  achievements={experience.description}
                  startDate={formatDate(experience.startDate)}
                  endDate={formatDate(experience.endDate)}
                  icon={<Briefcase />}
                  type={"work"}
                />
              </div>
            ))}

            {allEducation.map((education, index) => (
              <div
                key={`edu-${index}`}
                className="flex items-start gap-6 md:gap-10 relative"
              >
                <div className="bg-pink-400 rounded-full p-2 z-10 mt-2">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <TimelineCard
                  title={education.institution}
                  subtitle={education.degree}
                  // technologies={education.technologies}
                  achievements={education.description}
                  startDate={formatDate(education.startDate)}
                  endDate={formatDate(education.endDate)}
                  icon={<GraduationCap />}
                  type={"education"}
                />
              </div>
            ))}

            {/* Final dot */}
            <div className="flex items-center gap-6 md:gap-10 relative">
              <div className="bg-green-500 rounded-full p-2 z-10">
                <div className="w-5 h-5 text-white flex items-center justify-center">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Professional;
