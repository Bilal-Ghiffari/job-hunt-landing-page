import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";
import { useTranslation } from "react-i18next";

export const useFilterCategoryCompany = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useSWR("/api/company/categories", fetcher);
  const categories = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error, true),
    [data, error, isLoading]
  );
  const filter = useMemo(() => {
    return [
      {
        name: "industry",
        label: t("findobsandcompanies.checkbox-industry"),
        options: categories,
      },
    ] as filterFormType[];
  }, [categories, t]);

  return { filter };
};
