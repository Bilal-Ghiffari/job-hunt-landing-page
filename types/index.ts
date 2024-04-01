export type JobItemType = {
  id?: string;
  image: string;
  desc?: string;
  categories: Omit<categoryJobType, "totalJobs" | "_count">;
  jobType: string;
  location: string;
  name: string;
  type: string;
  needs: number;
  applicants: number;
  skills: string[];
};

export type FeatureJobType = Omit<JobItemType, "needs" | "applicants">;

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  options: optionType[];
};

export type CompanyTeamType = {
  id: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
};

export type CompanySocmedType = {
  id: string;
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
};

export type CompanyType = {
  id: string;
  image: string;
  totalJobs: number;
  name: string;
  description: string;
  website: string;
  location: string;
  employes: string;
  industry: string;
  dateFounded: Date;
  techStack: string[];
  sosmed: CompanySocmedType;
  teams: CompanyTeamType[];
};

export type categoryJobType = {
  id: string;
  name: string;
  totalJobs: number;
  _count: {
    Job: number;
  };
};

export type LatestDataJobsType = {
  id?: string;
  name: string;
  category: string;
  image: string;
  jobType: string;
  location: string;
  type: string;
};

export type ApplicantType = {
  jobId: string | null;
};
