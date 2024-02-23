import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";

export const useCategoryJobFilter = () => {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);
  // console.log("categoriesData", data);
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, isLoading, error]
  );
  const filters = useMemo(() => {
    console.log("memoize-filters");
    return [
      {
        label: "Categories",
        name: "categories",
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);
  return { filters };
};
