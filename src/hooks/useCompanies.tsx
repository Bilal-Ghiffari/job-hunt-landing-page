import { fetcher, parsingCompanies } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { JobItemType } from "../../types";
import { useSearchStore } from "@/lib/stores/search";
import { useFilterStore } from "@/lib/stores/filter";

const COMPANY_PATH = "/api/company";

const useCompanies = () => {
  const { industry } = useFilterStore((state) => state.filter);
  const { title, location } = useSearchStore((state) => state.search);
  const paramsQueryString = useMemo(() => {
    const categoryParam = industry?.join(",");
    return { categoryParam };
  }, [industry]);

  const searchParams = useMemo(() => {
    const searchText = title.trim();
    const searchOptions = location.trim();
    return { searchOptions, searchText };
  }, [title, location]);

  const queryString = useMemo(() => {
    const { categoryParam } = paramsQueryString;
    const { searchOptions, searchText } = searchParams;
    let params = [];
    if (searchText) params.push(`search=${encodeURIComponent(searchText)}`);
    if (searchOptions)
      params.push(`location=${encodeURIComponent(searchOptions)}`);
    if (categoryParam)
      params.push(`category=${encodeURIComponent(categoryParam)}`);
    return params.join("&");
  }, [searchParams, paramsQueryString]);

  const { data, isLoading, error, mutate } = useSWR(
    `${COMPANY_PATH}?${queryString}`,
    fetcher,
    { revalidateOnMount: false }
  );
  const [companies, setCompanies] = useState<JobItemType[]>([]);
  const parseJobs = useCallback(async () => {
    const parseData = await parsingCompanies(data, isLoading, error);
    setCompanies(parseData);
  }, [data, isLoading, error]);

  useEffect(() => {
    parseJobs();
  }, [data, isLoading, error]);

  return {
    companies,
    isLoading,
    mutate,
  };
};

export default useCompanies;
