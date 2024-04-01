"use client";
import { useFilterStore } from "@/lib/stores/filter";
import { useRouter } from "next/navigation";
import TitleSection from "@/components/atoms/TitleSection";
import React, { useMemo } from "react";
import useSWR from "swr";
import { fetcher, parsingCategories } from "@/lib/utils";
import CategoryItem from "./CategoryItem";
import { categoryJobType } from "../../../../types";
import { useTranslation } from "react-i18next";

type Props = {};

export default function Category({}: Props) {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);
  const categories = useMemo(
    () => parsingCategories(data, isLoading, error),
    [data, isLoading, error]
  );
  const { t } = useTranslation();
  const router = useRouter();
  const { setFilter, filter } = useFilterStore();
  const onClick = (id: any) => {
    router.push("/find-jobs");
    setFilter({ categories: [id] });
  };
  return (
    <div className="mt-32 mb-8">
      <TitleSection
        word1={t("category.title-1")}
        word2={t("category.title-2")}
        word3={t("category.show-jobs")}
      />
      <div className="grid grid-cols-5 gap-9 mt-12">
        {categories.map((item: categoryJobType) => (
          <CategoryItem
            handleClick={() => onClick(item.id)}
            key={item.id}
            name={item.name}
            totalJobs={item.totalJobs}
            word1={t("category.jobs-available")}
          />
        ))}
      </div>
    </div>
  );
}
