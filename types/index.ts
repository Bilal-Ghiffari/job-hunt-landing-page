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
  items: optionType[];
};

export type CompanyType = {
  image: string;
  totalJobs: number;
  name: string;
  description: string;
  categories: string;
};

export type categoryJobType = {
  id: string;
  name: string;
  totalJobs: number;
  _count: {
    Job: number;
  };
};
