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

type Props = {};
type FormFilterValues = z.infer<typeof formFilterSchema>;
type FormSearchValues = z.infer<typeof formSearchShema>;

export default function FindJobs({}: Props) {
  const { filters: filtersCategory } = useCategoryJobFilter();
  const { filters: filtersJobType } = useJobTypeFilter();
  const combinedFilter: filterFormType[] = [
    ...filtersCategory,
    ...filtersJobType,
  ];
  const { setFilter } = useFilterStore((state) => state);
  const { setSearch } = useSearchStore((state) => state);
  const { jobs, isLoading, mutate } = useJob();
  const formFilter = useForm<FormFilterValues>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
      jobtype: [],
    },
  });

  const formSearch = useForm<FormSearchValues>({
    resolver: zodResolver(formSearchShema),
    defaultValues: {
      location: "",
      title: "",
    },
  });

  const onSubmitFormFilters = async (val: FormFilterValues) => {
    setFilter(val);
  };

  const onSubmitSearch = async (val: FormSearchValues) => {
    setSearch(val);
  };

  useEffect(() => {
    mutate();
  }, []);
  return (
    <ExploreDataContainer
      formFilters={formFilter}
      formSearch={formSearch}
      onSubmitFilters={onSubmitFormFilters}
      onSubmitSearch={onSubmitSearch}
      filterForms={combinedFilter}
      title="dream job"
      subTitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
      loading={isLoading}
      type="job"
      data={jobs}
    />
  );
}
