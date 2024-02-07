export type JobItemType = {
  image: string;
  desc?: string;
  categories: string[];
  jobType: string;
  location: string;
  name: string;
  type: string;
  needs: number;
  applicants: number;
};

export type FeatureJobType = Omit<JobItemType, "needs" | "applicants">;

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  items: optionType[];
};

export type CompanyType = {
  image: string;
  totalJobs: number;
  name: string;
  description: string;
  categories: string;
};
