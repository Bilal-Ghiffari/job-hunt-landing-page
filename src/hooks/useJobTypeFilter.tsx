import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";

export const useJobTypeFilter = () => {
  const { data, isLoading, error } = useSWR("/api/jobs/typejob", fetcher);
  const jobType = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, isLoading, error]
  );
  const filters = useMemo(() => {
    return [
      {
        options: jobType,
        label: "Job Type",
        name: "jobtype",
      },
    ] as filterFormType[];
  }, [jobType]);
  return { filters };
};
