import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";

export const useFilterCategoryCompany = () => {
  const { data, error, isLoading } = useSWR("/api/company/categories", fetcher);
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error, true),
    [data, error, isLoading]
  );
  const filter = useMemo(() => {
    return [
      {
        name: "industry",
        label: "Industry",
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);

  return { filter };
};
