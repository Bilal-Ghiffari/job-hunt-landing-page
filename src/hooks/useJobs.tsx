"use client";
import { useFilterStore } from "@/lib/stores/filter";
import { useSearchStore } from "@/lib/stores/search";
import { fetcher, parsingJobs } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { JobItemType } from "../../types";

const JOB_PATH = "/api/jobs";
export const useJob = () => {
  const { categories, jobtype } = useFilterStore((state) => state.filter);
  const { title, location } = useSearchStore((state) => state.search);

  const paramQueryString = useMemo(() => {
    const categoryParam = categories?.join(",");
    const jobTypeParam = jobtype?.join(",");
    return { categoryParam, jobTypeParam };
  }, [categories, jobtype]);

  const searchParams = useMemo(() => {
    const searchText = title.trim();
    const searchOptions = location.trim();
    return { searchText, searchOptions };
  }, [title, location]);

  const queryString = useMemo(() => {
    const { categoryParam, jobTypeParam } = paramQueryString;
    const { searchOptions, searchText } = searchParams;
    let params = [];
    if (searchText) params.push(`search=${encodeURIComponent(searchText)}`);
    if (searchOptions)
      params.push(`location=${encodeURIComponent(searchOptions)}`);
    if (categoryParam)
      params.push(`category=${encodeURIComponent(categoryParam)}`);
    if (jobTypeParam)
      params.push(`typeJob=${encodeURIComponent(jobTypeParam)}`);
    return params.join("&");
  }, [searchParams, paramQueryString]);

  const { data, error, isLoading, mutate } = useSWR(
    `${JOB_PATH}?${queryString}`,
    fetcher,
    {
      revalidateOnMount: false,
    }
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
