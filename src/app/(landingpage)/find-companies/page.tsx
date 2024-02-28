"use client";

import React, { useEffect, useState } from "react";
import { CompanyType, filterFormType } from "../../../../types";
import { CATEGORIES_OPTIONS } from "@/constant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formFilterCompanySchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ExploreDataContainer from "@/container/ExploreDataContainer";
import { useFilterCategoryCompany } from "@/hooks/useCategoryCompanyFilter";
import useCompanies from "@/hooks/useCompanies";

type Props = {};

export default function FindCompanies({}: Props) {
  const { filter } = useFilterCategoryCompany();
  const [categories, setCategories] = useState<string[]>([]);
  const { companies, isLoading, mutate } = useCompanies(categories);
  const forms = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  console.log("val", categories.join(","));
  const onSubmit = async (val: z.infer<typeof formFilterCompanySchema>) => {
    setCategories(val.industry);
  };

  useEffect(() => {
    mutate();
  }, [categories]);

  return (
    <ExploreDataContainer
      data={companies}
      filterForms={filter}
      formFilter={forms}
      loading={isLoading}
      onSubmitFilter={onSubmit}
      subTitle="Find the dreame companies you dream work for"
      title="dream companies"
      type="company"
    />
  );
}
