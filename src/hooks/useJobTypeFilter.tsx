import { fetcher, parsingCategoriesToOptions } from "@/lib/utils";
import { useMemo } from "react";
import useSWR from "swr";
import { filterFormType } from "../../types";
import { useTranslation } from "react-i18next";

export const useJobTypeFilter = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSWR("/api/jobs/typejob", fetcher);
  const jobType = useMemo(
    () => parsingCategoriesToOptions(data, isLoading, error),
    [data, isLoading, error]
  );
  const filters = useMemo(() => {
    return [
      {
        options: jobType,
        label: t("findobsandcompanies.checkbox-jobtype"),
        name: "jobtype",
      },
    ] as filterFormType[];
  }, [jobType, t]);
  return { filters };
};
