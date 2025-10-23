// prisma/seed.ts
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const usageValue = () => {
  return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
};

const Skills = [
  // Tech Stack (with category)
  {
    id: "1",
    title: "JavaScript",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747756662/javascript-logo_dfjsvh.svg",
    type: "Hard",
    category: "Programming_Language",
  },
  {
    id: "2",
    title: "React",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747756622/react-1-logo-png-transparent_ehl25d.png",
    type: "Hard",
    category: "Frontend",
  },
  {
    id: "3",
    title: "Node.js",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758116/nodejs_ovvaq1.svg",
    type: "Hard",
    category: "Backend",
  },
  {
    id: "4",
    title: "PostgreSQL",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758117/postgresql_fuzchu.svg",
    type: "Hard",
    category: "Database",
  },
  {
    id: "5",
    title: "Jest",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758109/jest_u2zqcv.svg",
    type: "Hard",
    category: "Testing",
  },
  {
    id: "6",
    title: "AWS",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758099/aws_ramocy.svg",
    type: "Hard",
    category: "Cloud_Devops",
  },
  {
    id: "7",
    title: "Agile",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747757388/3d2306400402e8022404c374f2f627a74dd3aa4d-848x418_ew3vxn.jpg",
    type: "Both",
    category: "Practices",
  },

  // General Skills (no category)
  {
    id: "8",
    title: "Communication",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758100/communication_fe6qpr.svg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "9",
    title: "Problem Solving",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758120/problem-solving_yp0fgl.svg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "10",
    title: "Teamwork",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758124/team-work_hewqz5.svg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "11",
    title: "Leadership",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758110/leadership_d8tfoy.svg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "12",
    title: "Time Management",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758125/time-management_u2jjl9.svg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "13",
    title: "TypeScript",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758126/typescript_y2hemf.svg",
    type: "Hard",
    category: "Programming_Language",
  },
  {
    id: "14",
    title: "Firebase",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758104/firebase_q1orhi.svg",
    type: "Hard",
    category: "Backend",
  },
  {
    id: "15",
    title: "Python",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758121/python_mmrndg.svg",
    type: "Hard",
    category: "Programming_Language",
  },
  {
    id: "16",
    title: "Express",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758103/express_xudahk.svg",
    type: "Hard",
    category: "Backend",
  },
  {
    id: "17",
    title: "Cypress",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758102/cypress_uzlvdl.svg",
    type: "Hard",
    category: "Testing",
  },
  {
    id: "18",
    title: "Postman",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758118/postman_subeuw.svg",
    type: "Hard",
    category: "Testing",
  },
  {
    id: "19",
    title: "JMeter",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747757852/jmeter_square_cyzrp2.svg",
    type: "Hard",
    category: "Testing",
  },
  {
    id: "20",
    title: "Attention to Detail",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747757967/52HLA3XfQ3mQHQcjl8vX_z1cxva.jpg",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "21",
    title: "Appium",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758098/appium_rbrl8o.svg",
    type: "Hard",
    category: "Testing",
  },
  {
    id: "22",
    title: "Java",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758108/java_hkzmir.svg",
    type: "Hard",
    category: "Programming_Language",
  },
  {
    id: "23",
    title: "Adaptability",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758056/645478519a977913b0c7df40_Captura_20de_20Tela_202023-05-05_20a_CC_80s_2000.30.04_sqnoua.png",
    type: "Soft",
    category: "Core_Competencies",
  },
  {
    id: "24",
    title: "Figma",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747758056/645478519a977913b0c7df40_Captura_20de_20Tela_202023-05-05_20a_CC_80s_2000.30.04_sqnoua.png",
    type: "Soft",
    category: "Tools",
  },
];

const Projects = [
  {
    id: "1",
    profile_id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with React frontend and Node.js backend",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "1", usageLevel: usageValue() },
      { id: "2", usageLevel: usageValue() },
      { id: "3", usageLevel: usageValue() },
      { id: "4", usageLevel: usageValue() },
    ],
    skills: [
      { id: "8", usageLevel: usageValue() },
      { id: "9", usageLevel: usageValue() },
      { id: "10", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "January 2022",
    endDate: "June 2022",
    type: "Web_Development" as const,
    status: "Completed" as const,
  },
  {
    id: "2",
    profile_id: "2",
    title: "Test Automation Framework",
    description:
      "Custom testing framework for web applications with Selenium and Jest",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "1", usageLevel: usageValue() },
      { id: "5", usageLevel: usageValue() },
    ],
    skills: [
      { id: "9", usageLevel: usageValue() },
      { id: "11", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "July 2022",
    endDate: "October 2022",
    type: "Web_Testing" as const,
    status: "Completed" as const,
  },
  {
    id: "3",
    profile_id: "1",
    title: "Task Management App",
    description:
      "A Kanban-style task management application with real-time updates",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "2", usageLevel: usageValue() },
      { id: "13", usageLevel: usageValue() },
      { id: "14", usageLevel: usageValue() },
    ],
    skills: [
      { id: "8", usageLevel: usageValue() },
      { id: "12", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "November 2022",
    endDate: "February 2023",
    type: "Web_Development" as const,
    status: "Completed" as const,
  },
  {
    id: "4",
    profile_id: "1",
    title: "Weather Dashboard",
    description:
      "Real-time weather forecasting application with interactive maps",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "1", usageLevel: usageValue() },
      { id: "15", usageLevel: usageValue() },
      { id: "16", usageLevel: usageValue() },
    ],
    skills: [
      { id: "9", usageLevel: usageValue() },
      { id: "10", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "March 2023",
    endDate: "August 2023",
    type: "Web_Development" as const,
    status: "Completed" as const,
  },
  {
    id: "5",
    profile_id: "2",
    title: "E-Commerce Test Suite",
    description:
      "Comprehensive test suite for e-commerce platform covering UI, API, and performance testing",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "17", usageLevel: usageValue() },
      { id: "18", usageLevel: usageValue() },
      { id: "19", usageLevel: usageValue() },
    ],
    skills: [
      { id: "9", usageLevel: usageValue() },
      { id: "20", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    videos: [
      "https://www.youtube.com/watch?v=WJ0418yx1TE",
      "https://www.youtube.com/watch?v=WJ0418yx1TE",
    ],
    startDate: "October 2023",
    endDate: "December 2023",
    type: "Web_Testing" as const,
    status: "Completed" as const,
  },
  {
    id: "6",
    profile_id: "2",
    title: "Mobile App Test Automation",
    description:
      "Automated testing framework for cross-platform mobile applications",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "21", usageLevel: usageValue() },
      { id: "22", usageLevel: usageValue() },
      { id: "1", usageLevel: usageValue() },
    ],
    skills: [
      { id: "11", usageLevel: usageValue() },
      { id: "23", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "January 2024",
    endDate: "April 2024",
    type: "Mobile_Testing" as const,
    status: "Completed" as const,
  },
  {
    id: "7",
    profileId: "1",
    title: "Mobile Banking App ",
    description:
      "Developing a mobile banking application with a focus on security and user experience",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [
      { id: "2", usageLevel: usageValue() },
      { id: "4", usageLevel: usageValue() },
      { id: "1", usageLevel: usageValue() },
    ],
    skills: [
      { id: "11", usageLevel: usageValue() },
      { id: "23", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    videos: [
      "https://www.youtube.com/watch?v=WJ0418yx1TE",
      "https://www.youtube.com/watch?v=WJ0418yx1TE",
    ],
    startDate: "July 2024",
    endDate: "August 2024",
    type: "Mobile_Development",
    status: "Completed",
  },
  {
    id: "8",
    profileId: "1",
    title: "React Component Library",
    description: "Building a reusable component library for React applications",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [{ id: "2", usageLevel: usageValue() }],
    skills: [
      { id: "11", usageLevel: usageValue() },
      { id: "23", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "August 2024",
    endDate: "November 2024",
    type: "Web_Development",
    status: "Planning",
  },
  {
    id: "9",
    profileId: "2",
    title: "Demo API Testing Suite",
    description: "Automated testing framework for api applications",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [{ id: "22", usageLevel: usageValue() }],
    skills: [
      { id: "18", usageLevel: usageValue() },
      { id: "19", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "May 2024",
    endDate: "July 2024",
    type: "API_Testing",
    status: "In_Progress",
  },
  {
    id: "10",
    profileId: "2",
    title: "Restful Booker API Testing Suite",
    description: "Automated testing framework for api applications",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    sourceLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoLink: "https://github.com/abiolaah/next-nefllix-clone",
    demoVideoLink: "https://www.youtube.com/watch?v=WJ0418yx1TE",
    techStack: [{ id: "22", usageLevel: usageValue() }],
    skills: [
      { id: "18", usageLevel: usageValue() },
      { id: "19", usageLevel: usageValue() },
    ],
    images: [
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png",
    ],
    startDate: "May 2024",
    endDate: "July 2024",
    type: "API_Testing",
    status: "In_Progress",
  },
];

const Educations = [
  {
    id: "1",
    degree: "BSc Software Engineering",
    institution: "Stanford University",
    fieldOfStudy: "Computer Science",
    startDate: "May 2015",
    endDate: "Jul 2019",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    description: [
      "Stanford University is a private research university located in Stanford, California.",
    ],
    profile_id: "1",
  },
  {
    id: "2",
    degree: "MSc Quality Assurance",
    institution: "MIT",
    fieldOfStudy: "Software Testing",
    startDate: "Jun 2019",
    endDate: "Jul 2021",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    description: ["Specialized in automated testing and quality processes"],
    profile_id: "2",
  },
  {
    id: "3",
    degree: "BFA Digital Media",
    institution: "Rhode Island School of Design",
    fieldOfStudy: "Interactive Design",
    startDate: "May 2017",
    endDate: "June 2017",
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    description: ["Short course in interactive design principles"],
    profile_id: "1",
  },
];

const Experiences = [
  {
    id: "1",
    company: "TechCorp",
    role: "Frontend Developer",
    startDate: "Jul 2018",
    endDate: "Dec 2020",
    description: [
      "Built responsive UIs for SaaS products using React and Redux",
      "Collaborated with design team to implement pixel-perfect interfaces",
    ],
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    profile_id: "1",
  },
  {
    id: "2",
    company: "WebSolutions",
    role: "Full-Stack Developer",
    startDate: "Jan 2021",
    endDate: "Apr 2022",
    description: [
      "Led migration from monolithic to microservices architecture",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
    ],
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    profile_id: "1",
  },
  {
    id: "3",
    company: "QA Labs",
    role: "Automation Engineer",
    startDate: "Jul 2019",
    endDate: "Jun 2021",
    description: [
      "Developed end-to-end testing framework for financial software",
      "Reduced regression testing time by 60% through automation",
    ],
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    profile_id: "2",
  },
  {
    id: "4",
    company: "SecureSystems",
    role: "QA Lead",
    startDate: "Jun 2022",
    endDate: "Jul 2024",
    description: [
      "Managed testing team and implemented CI/CD pipelines",
      "Improved test coverage from 65% to 95% within 6 months",
    ],
    imageUrl:
      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg",
    profile_id: "2",
  },
];

async function resetData() {
  console.log("Resetting database...");

  // Reset all the table in the correct order to avoid foreign key issue
  await prisma.projectMedia.deleteMany();
  await prisma.projectTech.deleteMany();
  await prisma.projectSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.profileSkill.deleteMany();
  await prisma.experienceDescription.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.educationDescription.deleteMany();
  await prisma.education.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profileDetails.deleteMany();
  await prisma.profile.deleteMany();

  console.log("Finished resetting database.");
}

async function seedData() {
  console.log("Seeding database...");

  // Seed Profiles
  const profile1 = await prisma.profile.create({
    data: {
      name: "Developer",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-blue_wzdyhl.png",
    },
  });
  console.log(`Added ${profile1.name} with id ${profile1.id}`);

  const profile2 = await prisma.profile.create({
    data: {
      name: "Tester",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-slate_hwnqqm.png",
    },
  });
  console.log(`Added ${profile2.name} with id ${profile2.id}`);

  const profile3 = await prisma.profile.create({
    data: {
      name: "Recruiter(Developer)",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-red_rbsmq5.png",
    },
  });
  console.log(`Added ${profile3.name} with id ${profile3.id}`);

  const profile4 = await prisma.profile.create({
    data: {
      name: "Recruiter(Tester)",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-red_rbsmq5.png",
    },
  });
  console.log(`Added ${profile4.name} with id ${profile4.id}`);

  const profile5 = await prisma.profile.create({
    data: {
      name: "Adventurer",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-green_c1ltts.png",
    },
  });
  console.log(`Added ${profile5.name} with id ${profile5.id}`);

  const profile6 = await prisma.profile.create({
    data: {
      name: "Admin",
      avatar:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1749506780/default-slate_hwnqqm.png",
    },
  });
  console.log(`Added ${profile6.name} with id ${profile6.id}`);
  console.log(`Finished seeding profiles`);

  // Seed Profile Details
  const profileDetails1 = await prisma.profileDetails.create({
    data: {
      profileId: profile1.id,
      summary:
        "Results-oriented developer with over 3 years of experience in web development, product management, and technical support. Proven proficiency in software development practices, cloud infrastructure, and automation tools. Excellent communication skills with a strong ability to collaborate effectively within Agile teams and translate technical concepts for diverse audiences.",
      resume:
        "https://60sfo61mmq.ufs.sh/f/byCfzz9aXQ3orUAe8vloRXTQ36Az0dFyt8SgjeOY7lNuDUVH",
      bannerUrl:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760291/developer_gofw6r.gif",
    },
  });
  console.log(
    `Added profile details for ${profile1.name} with id ${profileDetails1.id}`
  );

  const profileDetails2 = await prisma.profileDetails.create({
    data: {
      profileId: profile2.id,
      summary:
        "Detail-oriented QA Engineer with over 3 years of experience in product management, software testing and web development. Proficient in Java, Python, and JavaScript, with a strong foundation in quality assurance practices and automation tools. Passionate about delivering high-quality products and continuously improving testing methodologies.",
      resume:
        "https://60sfo61mmq.ufs.sh/f/byCfzz9aXQ3orUAe8vloRXTQ36Az0dFyt8SgjeOY7lNuDUVH",
      bannerUrl:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760293/tester_vwjno7.gif",
    },
  });
  console.log(
    `Added profile details for ${profile2.name} with id ${profileDetails2.id}`
  );

  const profileDetails3 = await prisma.profileDetails.create({
    data: {
      profileId: profile3.id,
      summary:
        "Results-oriented developer with over 3 years of experience in web development, product management, and technical support. Proven proficiency in software development practices, cloud infrastructure, and automation tools. Excellent communication skills with a strong ability to collaborate effectively within Agile teams and translate technical concepts for diverse audiences.",
      resume:
        "https://60sfo61mmq.ufs.sh/f/byCfzz9aXQ3orUAe8vloRXTQ36Az0dFyt8SgjeOY7lNuDUVH",
      bannerUrl:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760291/recruiter_llz80w.gif",
    },
  });
  console.log(
    `Added profile details for ${profile3.name} with id ${profileDetails3.id}`
  );

  const profileDetails4 = await prisma.profileDetails.create({
    data: {
      profileId: profile4.id,
      summary:
        "Detail-oriented QA Engineer with over 3 years of experience in product management, software testing and web development. Proficient in Java, Python, and JavaScript, with a strong foundation in quality assurance practices and automation tools. Passionate about delivering high-quality products and continuously improving testing methodologies.",
      resume:
        "https://60sfo61mmq.ufs.sh/f/byCfzz9aXQ3orUAe8vloRXTQ36Az0dFyt8SgjeOY7lNuDUVH",
      bannerUrl:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760291/recruiter_llz80w.gif",
    },
  });
  console.log(
    `Added profile details for ${profile4.name} with id ${profileDetails4.id}`
  );

  const profileDetails5 = await prisma.profileDetails.create({
    data: {
      profileId: profile5.id,
      summary:
        "Motivated IT professional with over 3 years of experience in web development, software tetsing and product management. Proven proficiency in full-stack development, front-end and back-end technologies, software testing methodologies and Agile methodologies. Strong skills in creating and testing responsive web applications, mobile development, API integrations and testing, and collaborative problem-solving. Experienced in translating client requirements into functional software solutions with a focus on user experience and performance optimization",
      resume:
        "https://60sfo61mmq.ufs.sh/f/byCfzz9aXQ3orUAe8vloRXTQ36Az0dFyt8SgjeOY7lNuDUVH",
      bannerUrl:
        "https://res.cloudinary.com/dixwarqdb/image/upload/v1747760290/adventurer_yftocm.gif",
    },
  });
  console.log(
    `Added profile details for ${profile5.name} with id ${profileDetails5.id}`
  );

  console.log(`Finished seeding profile details`);

  // Seed Skills
  const skills = await Promise.all(
    Skills.map((skill) =>
      prisma.skill.create({
        data: {
          title: skill.title,
          imageUrl: skill.imageUrl,
          type: skill.type as "Hard" | "Soft" | "Both",
          category: skill.category as
            | "Programming_Language"
            | "Frontend"
            | "Backend"
            | "Database"
            | "Testing"
            | "Core_Competencies"
            | "Cloud_Devops"
            | "Practices"
            | "Tools",
          isCommon: true,
        },
      })
    )
  );

  console.log("Finished seeding skills");

  // Create a map of skill titles to their IDs for easy reference
  const skillIdMap = new Map<string, string>();
  Skills.forEach((originalSkill, index) => {
    skillIdMap.set(originalSkill.id, skills[index].id);
  });

  console.log("Skill Ids Mapping complete");

  // Seed Profile Skills (without level)
  // Developer Profile Skills
  const devProfileSkills = await Promise.all(
    Skills.filter((skill) =>
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "16",
        "23",
      ].includes(skill.id)
    ).map((skill) => {
      const dbSkillId = skillIdMap.get(skill.id)!;
      return prisma.profileSkill.create({
        data: {
          profileId: profile1.id,
          skillId: dbSkillId,
          isCustom: false,
        },
      });
    })
  );
  console.log("Developer Profile Skills seeded:", devProfileSkills.length);

  // Tester Profile Skills
  const testerProfileSkills = await Promise.all(
    Skills.filter((skill) =>
      [
        "1",
        "5",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "15",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ].includes(skill.id)
    ).map((skill) => {
      const dbSkillId = skillIdMap.get(skill.id)!;
      return prisma.profileSkill.create({
        data: {
          profileId: profile2.id,
          skillId: dbSkillId,
          isCustom: false,
        },
      });
    })
  );
  console.log("Tester Profile Skills seeded:", testerProfileSkills.length);

  // Recruiter - Developer Profile Skills
  const recruiterDevProfileSkills = await Promise.all(
    Skills.filter((skill) =>
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "16",
        "23",
      ].includes(skill.id)
    ).map((skill) => {
      const dbSkillId = skillIdMap.get(skill.id)!;
      return prisma.profileSkill.create({
        data: {
          profileId: profile3.id,
          skillId: dbSkillId,
          isCustom: false,
        },
      });
    })
  );
  console.log(
    "Recruiter - Developer Profile Skills seeded:",
    recruiterDevProfileSkills.length
  );

  // Recruiter - Tester Profile Skills
  const recruiterTesterProfileSkills = await Promise.all(
    Skills.filter((skill) =>
      [
        "1",
        "5",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "15",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ].includes(skill.id)
    ).map((skill) => {
      const dbSkillId = skillIdMap.get(skill.id)!;
      return prisma.profileSkill.create({
        data: {
          profileId: profile4.id,
          skillId: dbSkillId,
          isCustom: false,
        },
      });
    })
  );
  console.log(
    "Recruiter - Tester Profile Skills seeded:",
    recruiterTesterProfileSkills.length
  );

  // Adventurer Profile Skills
  const adventurerProfileSkills = await Promise.all(
    Skills.filter((skill) =>
      ["8", "9", "10", "11", "12", "20", "23"].includes(skill.id)
    ).map((skill) => {
      const dbSkillId = skillIdMap.get(skill.id)!;
      return prisma.profileSkill.create({
        data: {
          profileId: profile5.id,
          skillId: dbSkillId,
          isCustom: false,
        },
      });
    })
  );
  console.log(
    "Adventurer Profile Skills seeded:",
    adventurerProfileSkills.length
  );

  console.log("Finished seeding Profile Skills");

  // Seed Projects
  const projects = await Promise.all(
    Projects.map(async (project) => {
      const media: Array<{ url: string }> = [];

      // Add images if they exist
      if (project.images && project.images.length > 0) {
        media.push(
          ...project.images.map((imageUrl: string) => ({
            url: imageUrl,
          }))
        );
      }

      // Determine which profile this project belongs to
      let profileId: string;
      switch (project.profile_id) {
        case "1":
          profileId = profile1.id;
          break;
        case "2":
          profileId = profile2.id;
          break;
        case "3":
          profileId = profile3.id;
          break;
        case "4":
          profileId = profile4.id;
          break;
        case "5":
          profileId = profile5.id;
          break;
        default:
          profileId = profile1.id; // fallback
      }

      // Map skill IDs and usage levels
      const skillsWithLevels = project.skills.map((skillData) => ({
        skillId: skillIdMap.get(skillData.id)!,
        usageLevel: skillData.usageLevel,
      }));

      const techStackWithLevels = project.techStack.map((techData) => ({
        skillId: skillIdMap.get(techData.id)!,
        usageLevel: techData.usageLevel,
      }));

      return prisma.project.create({
        data: {
          profileId,
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          sourceLink: project.sourceLink,
          demoLink: project.demoLink,
          demoVideoLink: project.demoVideoLink || null,
          type: project.type as
            | "Web_Development"
            | "Mobile_Development"
            | "Web_Testing"
            | "Mobile_Testing"
            | "API_Testing"
            | "Others",
          status: project.status as "Planning" | "In_Progress" | "Completed",
          startDate: project.startDate ? new Date(project.startDate) : null,
          endDate: project.endDate ? new Date(project.endDate) : null,
          skills: {
            create: skillsWithLevels.map((skill) => ({
              skillId: skill.skillId,
              usageLevel: skill.usageLevel,
            })),
          },
          techStack: {
            create: techStackWithLevels.map((tech) => ({
              skillId: tech.skillId,
              usageLevel: tech.usageLevel,
            })),
          },
          media: {
            create: media,
          },
        },
      });
    })
  );

  console.log("Finished seeding Projects", projects.length);

  // Seed Education
  const education = await Promise.all(
    Educations.map(async (edu) => {
      // Determine which profile this education belongs to
      let profileId: string;
      switch (edu.profile_id) {
        case "1":
          profileId = profile1.id;
          break;
        case "2":
          profileId = profile2.id;
          break;
        default:
          profileId = profile1.id; // fallback
      }

      return prisma.education.create({
        data: {
          profileId,
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy,
          startDate: new Date(edu.startDate),
          endDate: new Date(edu.endDate),
          imageUrl: edu.imageUrl,
          isCommon: false,
          descriptions: {
            create: edu.description.map((content: string) => ({
              content,
            })),
          },
        },
      });
    })
  );

  console.log("Finished seeding Education", education.length);

  // Seed Experience
  const experience = await Promise.all(
    Experiences.map(async (exp) => {
      // Determine which profile this experience belongs to
      let profileId: string;
      switch (exp.profile_id) {
        case "1":
          profileId = profile1.id;
          break;
        case "2":
          profileId = profile2.id;
          break;
        default:
          profileId = profile1.id; // fallback
      }

      return prisma.experience.create({
        data: {
          profileId,
          company: exp.company,
          role: exp.role,
          startDate: new Date(exp.startDate),
          endDate: new Date(exp.endDate),
          imageUrl: exp.imageUrl,
          isCommon: false,
          descriptions: {
            create: exp.description.map((content: string) => ({
              content,
            })),
          },
        },
      });
    })
  );

  console.log("Finished seeding Experience", experience.length);

  console.log("Seed data created successfully");
}

async function main() {
  await resetData(); // Reset the data first
  await seedData(); // Then seed new data
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
