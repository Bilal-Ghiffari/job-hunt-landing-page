import { useCallback, useEffect, useState } from "react";
import { JobItemType } from "../../types";
import useSWR from "swr";
import { fetcher, parsingJobs } from "@/lib/utils";

export const useListJobs = (path: string) => {
  const [jobs, setJobs] = useState<JobItemType[]>([]);
  const { data, isLoading, error } = useSWR(`/api/${path}`, fetcher);
  const paserJobs = useCallback(async () => {
    const parseData = await parsingJobs(data, isLoading, error);
    setJobs(parseData);
    console.log("parsingdata", parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    paserJobs();
  }, [data, isLoading, error]);

  console.log("data", jobs);
  return { jobs, isLoading, error };
};
