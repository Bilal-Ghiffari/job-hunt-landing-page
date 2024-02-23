"use client";
import TitleSection from "@/components/atoms/TitleSection";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ItemJob from "./ItemJob";
import useSWR from "swr";
import { fetcher, parsingJobs } from "@/lib/utils";
import { JobItemType } from "../../../../types";
import { useListJobs } from "@/hooks/useFeaturedJobs";

type Props = {};

export default function FeaturedJobs({}: Props) {
  const { jobs, isLoading, error } = useListJobs("jobs/featured");
  return (
    <div className="mt-32 mb-10">
      <TitleSection word1="Featured" word2="jobs" />
      <div className="grid grid-cols-3 gap-8 mt-12">
        {jobs.map((item: JobItemType) => (
          <ItemJob key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
