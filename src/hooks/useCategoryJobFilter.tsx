import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";
import { useTranslation } from "react-i18next";

export const useCategoryJobFilter = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, isLoading, error]
  );
  const filters = useMemo(() => {
    return [
      {
        label: t("findobsandcompanies.checkbox-category"),
        name: "categories",
        options: categories,
      },
    ] as filterFormType[];
  }, [categories, t]);
  return { filters };
};
