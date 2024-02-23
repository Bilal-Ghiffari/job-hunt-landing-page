"use client";

import ExploreDataContainer from "@/container/ExploreDataContainer";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formFilterSchema } from "@/lib/form-schema";
import { JobItemType, filterFormType } from "../../../../types";
import { CATEGORIES_OPTIONS } from "@/constant";
import { useCategoryJobFilter } from "@/hooks/useCategoryJobFilter";
import { useJob } from "@/hooks/useJobs";

type Props = {};

export default function FindJobs({}: Props) {
  const { filters } = useCategoryJobFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const { jobs, isLoading, mutate } = useJob(categories);
  // console.log("filters", filters);
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    // console.log("val", val);
    setCategories(val.categories);
  };

  useEffect(() => {
    mutate();
    console.log("render");
  }, [categories]);
  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={filters}
      title="dream job"
      subTitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
      loading={isLoading}
      type="job"
      data={jobs}
    />
  );
}
