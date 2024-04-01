"use client";

import ExploreDataContainer from "@/container/ExploreDataContainer";
import { useCategoryJobFilter } from "@/hooks/useCategoryJobFilter";
import { useJob } from "@/hooks/useJobs";
import { useJobTypeFilter } from "@/hooks/useJobTypeFilter";
import { formFilterSchema, formSearchShema } from "@/lib/form-schema";
import { useFilterStore } from "@/lib/stores/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { filterFormType } from "../../../../types";
import { useSearchStore } from "@/lib/stores/search";
import { useTranslation } from "react-i18next";

type Props = {};
type FormFilterValues = z.infer<typeof formFilterSchema>;
type FormSearchValues = z.infer<typeof formSearchShema>;

export default function findobsandcompanies({}: Props) {
  const { filters: filtersCategory } = useCategoryJobFilter();
  const { filters: filtersJobType } = useJobTypeFilter();
  const combinedFilter: filterFormType[] = [
    ...filtersCategory,
    ...filtersJobType,
  ];
  const { setFilter, resetFilter, filter } = useFilterStore((state) => state);
  const { setSearch, resetSearch } = useSearchStore((state) => state);
  const { t } = useTranslation();
  const { jobs, isLoading, mutate } = useJob();
  const formFilter = useForm<FormFilterValues>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: filter?.categories ?? [],
      jobtype: filter?.jobtype ?? [],
    },
  });
  const formSearch = useForm<FormSearchValues>({
    resolver: zodResolver(formSearchShema),
    defaultValues: {
      location: "Indonesia",
      title: "",
    },
  });

  const onSubmitFormFilters = async (val: FormFilterValues) => {
    setFilter(val!!);
  };

  const onSubmitSearch = async (val: FormSearchValues) => {
    setSearch(val!!);
  };

  useEffect(() => {
    mutate();
    // resetFilter();
    resetSearch();
  }, []);
  return (
    <ExploreDataContainer
      formFilters={formFilter}
      formSearch={formSearch}
      onSubmitFilters={onSubmitFormFilters}
      onSubmitSearch={onSubmitSearch}
      filterForms={combinedFilter}
      title={t("findobsandcompanies.titleJobs")}
      subTitle={t("findobsandcompanies.subTitleJobs")}
      loading={isLoading}
      type="job"
      data={jobs}
    />
  );
}
