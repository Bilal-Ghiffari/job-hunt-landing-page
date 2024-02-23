import { fetcher, parsingJobs } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { JobItemType } from "../../types";

const JOB_PATH = "/api/jobs/filter";
export const useJob = (filter: string[]) => {
  const paramsCategory = useMemo(() => {
    if (filter && filter.length > 0) {
      // console.log("filter", filter.join(","));
      console.log("momoize-params-category");
      return filter.join(",");
    }
    return "";
  }, [filter]);

  const { data, error, isLoading, mutate } = useSWR(
    `${JOB_PATH}?category=${paramsCategory}`,
    fetcher
  );
  const [jobs, setJobs] = useState<JobItemType[]>([]);

  const parseJobs = useCallback(async () => {
    const parseData = await parsingJobs(data, isLoading, error);
    setJobs(parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    jobs,
    mutate,
    isLoading,
  };
};
