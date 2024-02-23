"use client";
import TitleSection from "@/components/atoms/TitleSection";
import React, { useMemo } from "react";
import useSWR from "swr";
import { fetcher, parsingCategories } from "@/lib/utils";
import CategoryItem from "./CategoryItem";
import { categoryJobType } from "../../../../types";

type Props = {};

export default function Category({}: Props) {
  const { data, isLoading, error } = useSWR("/api/jobs/categories", fetcher);
  const categories = useMemo(
    () => parsingCategories(data, isLoading, error),
    [data, isLoading, error]
  );
  // console.log("memoize", categories);
  // console.log("data", data);
  return (
    <div className="mt-32 mb-8">
      <TitleSection word1="Explore by" word2="category" />
      <div className="grid grid-cols-5 gap-9 mt-12">
        {categories.map((item: categoryJobType) => (
          <CategoryItem
            key={item.id}
            name={item.name}
            totalJobs={item.totalJobs}
          />
        ))}
      </div>
    </div>
  );
}
