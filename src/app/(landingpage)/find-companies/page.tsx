"use client";

import React, { useEffect, useState } from "react";
import { CompanyType, filterFormType } from "../../../../types";
import { CATEGORIES_OPTIONS } from "@/constant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  formFilterCompanySchema,
  formFilterSchema,
  formSearchShema,
} from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ExploreDataContainer from "@/container/ExploreDataContainer";
import { useFilterCategoryCompany } from "@/hooks/useCategoryCompanyFilter";
import useCompanies from "@/hooks/useCompanies";
import { useFilterStore } from "@/lib/stores/filter";
import { useSearchStore } from "@/lib/stores/search";
import { useTranslation } from "react-i18next";

type Props = {};
type FormFilterValues = z.infer<typeof formFilterCompanySchema>;
type FormSearchValues = z.infer<typeof formSearchShema>;
export default function FindCompanies({}: Props) {
  const { filter } = useFilterCategoryCompany();
  const { t } = useTranslation();
  const { setFilter, resetFilter } = useFilterStore((state) => state);
  const { setSearch, resetSearch } = useSearchStore((state) => state);
  const { companies, isLoading, mutate } = useCompanies();
  const formFilters = useForm<FormFilterValues>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
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
    setFilter(val!!);
  };

  const onSubmitSearch = async (val: FormSearchValues) => {
    setSearch(val!!);
  };

  useEffect(() => {
    mutate();
    resetFilter();
    resetSearch();
  }, []);

  return (
    <ExploreDataContainer
      formSearch={formSearch}
      formFilters={formFilters}
      data={companies}
      filterForms={filter}
      loading={isLoading}
      onSubmitFilters={onSubmitFormFilters}
      onSubmitSearch={onSubmitSearch}
      subTitle={t("findobsandcompanies.subTitleCompanies")}
      title={t("findobsandcompanies.titleCompanies")}
      type="company"
    />
  );
}
