interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
}

interface ProfileDetailsProps {
  id: string;
  profileId: string;
  summary: string;
  aboutSummary?: string;
  resume: string;
  bannerUrl: string;
}

interface ProfilesDetailsProps {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  assetId?: string | null;
  details?: {
    id: string;
    profileId: string;
    summary?: string | null;
    resume?: string | null;
    bannerUrl?: string | null;
    assetId?: string | null;
  } | null;
}

interface SkillsProps {
  id: string;
  title: string;
  imageUrl: string;
  type: "Hard" | "Soft" | "Both";
  assetId?: string; // Optional field for asset management
  category?:
    | "Programming_Language"
    | "Frontend"
    | "Backend"
    | "Database"
    | "Testing"
    | "Core_Competencies"
    | "Cloud_Devops"
    | "Practices"
    | "Tools";
  profiles: ProfileSkillProps[];
}

interface ProfileSkillProps {
  id: string;
  profileId: string;
}

interface ProjectsProps {
  id: string;
  profileId: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceLink: string;
  demoLink: string;
  demoVideoLink?: string;
  skills: ProjectSkills[];
  techStack: ProjectSkills[];
  startDate?: Date;
  endDate?: Date;
  images?: ProjectMediaProps[];
  type?:
    | "Web_Development"
    | "Mobile_Development"
    | "Web_Testing"
    | "Mobile_Testing"
    | "API_Testing"
    | "Others";
  createdAt?: string;
  updatedAt?: string;
  status?: "Planning" | "In_Progress" | "Completed";
  assetId?: string; // Optional field for asset management
}

interface ProjectMediaProps {
  id: string;
  projectId: string;
  url: string;
  assetId?: string | null; // Optional field for asset management
}

interface ProjectSkills {
  id: string;
  projectId: string;
  skillId: string;
  usageLevel: number;
}

type Items = (ProjectsProps | SkillsProps) & {
  variant: "project" | "skill";
};

interface EducationProps {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  assetId?: string; // Optional field for asset management
  imageUrl: string;
  description: string[];
}

interface ExperienceProps {
  id: string;
  company: string;
  role: string;
  startDate: Date;
  endDate: Date;
  assetId?: string; // Optional field for asset management
  description: string[];
  imageUrl: string;
}

// Dashboard Specific Type definitions
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "featured";
}

interface KeyMetricsProps {
  totalProjects: number | string;
  totalSkills: number | string;
  portfolioViews?: number | string;
  clientInquiries?: number | string;
}
interface DashboardChartProps {
  projectDistribution: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  skillCategories: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
}
interface ActivityProps {
  id: string;
  title: string;
  type: string; // "project", "skill", "education", "experience"
  status: string;
  date: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  progress: number;
}
interface RecentActivityProps {
  activities: ActivityProps[];
}

interface ProjectBreakdownProps {
  webDev: number;
  mobileDev: number;
  webTest: number;
  mobileTest: number;
  apiTest: number;
  others: number;
}
interface SkillBreakdownProps {
  softSkills: number;
  hardSkills: number;
  programmingSkills: number;
  testingSkills: number;
}
interface ItemsBreakdownProps {
  projectBreakdown: ProjectBreakdownProps;
  skillBreakdown: SkillBreakdownProps;
}

interface DashboardDataProps {
  keyMetricData: KeyMetricsProps;
  chartData: DashboardChartProps;
  recentActivities: RecentActivityProps;
  itemsBreakdown: ItemsBreakdownProps;
}
