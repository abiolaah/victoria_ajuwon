import { FileText, Linkedin } from "lucide-react";
import Image from "next/image";
import React from "react";

type BillboardProps = {
  profile: string;
  summary: string;
  videoUrl: string;
  resume: string;
};
const Billboard = ({ profile, summary, videoUrl, resume }: BillboardProps) => {
  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/victoria-ajuwon/");
  };
  const handleResume = () => {
    console.log(resume);
    // window.open(resume);
    window.open("https://www.linkedin.com/in/victoria-ajuwon/");
  };

  return (
    <div className="relative h-[56.25vw]">
      <Image
        src={videoUrl || "file.svg"}
        className="w-full h-[56.25vw] object-cover brightness-60"
        alt={`${profile} Gif`}
        fill
      />
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-16 max-w-[calc(100%-2rem)] md:max-w-[calc(100%-8rem)]">
        <h3 className="text-white text-xl md:text-3xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          <span>{profile}</span>
        </h3>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {summary}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button
            type="button"
            onClick={handleResume}
            className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition justify-between gap-2"
          >
            <FileText />
            Resume
          </button>
          <button
            type="button"
            onClick={handleLinkedIn}
            className="bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center hover:bg-white/20 transition justify-between gap-2"
          >
            <Linkedin className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
