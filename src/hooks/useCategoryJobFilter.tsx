import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";

export const useCategoryJobFilter = () => {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, isLoading, error]
  );
  const filters = useMemo(() => {
    return [
      {
        label: "Categories",
        name: "categories",
        options: categories,
      },
    ] as filterFormType[];
  }, [categories]);
  return { filters };
};
