"use client";
import TitleSection from "@/components/atoms/TitleSection";
import { useListJobs } from "@/hooks/useFeaturedJobs";
import { useTranslation } from "react-i18next";
import { JobItemType } from "../../../../types";
import ItemJob from "./ItemJob";

type Props = {};

export default function FeaturedJobs({}: Props) {
  const { jobs, isLoading, error } = useListJobs("jobs/featured");
  const { t } = useTranslation();
  return (
    <div className="mt-32 mb-10">
      <TitleSection
        word1={t("featured.title-1")}
        word2={t("featured.title-2")}
      />
      <div className="grid grid-cols-3 gap-8 mt-12">
        {jobs.map((item: JobItemType) => (
          <ItemJob key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
