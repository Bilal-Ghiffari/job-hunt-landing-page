import CompanyCard from "@/components/organisme/CompanyCard";
import EmptyData from "@/components/organisme/EmptyData";
import FormFilterDynamic, {
  FilterFormProps,
} from "@/components/organisme/FormFilterDynamic";
import FormSearchDynamic from "@/components/organisme/FormSearchDynamic";
import JobCard from "@/components/organisme/JobCard";
import SkeletonJob from "@/components/organisme/JobCard/SkeletonJob";
import { useFilterStore } from "@/lib/stores/filter";
import { useSearchStore } from "@/lib/stores/search";
import Image from "next/image";
import { Suspense, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

type FormFilterValues = {
  categories: string[];
  jobtype: string[];
  industry?: string[];
};

type Props = {
  formFilters: any;
  formSearch: any;
  onSubmitFilters: (val: any) => Promise<void>;
  onSubmitSearch: (val: any) => Promise<void>;
  filterForms: FilterFormProps[];
  loading: boolean;
  title: string;
  subTitle: string;
  data: any[];
  type: "job" | "company";
};

export default function ExploreDataContainer({
  loading,
  title,
  subTitle,
  data,
  type,
  filterForms,
  formFilters,
  formSearch,
  onSubmitFilters,
  onSubmitSearch,
}: Props) {
  const { resetFilter } = useFilterStore((state) => state);
  const { resetSearch } = useSearchStore((state) => state);
  const { t } = useTranslation();
  const handleResetFilter = useCallback(() => {
    resetFilter();
    resetSearch();
    formFilters.reset({ categories: [], jobtype: [] });
    formSearch.reset();
  }, [resetFilter, resetSearch, formFilters, formSearch]);

  return (
    <>
      <div className="bg-gray-200 px-32 pt-16 pb-14">
        <div className="mb-10">
          <div className="mx-auto mb-11 text-center flex justify-center gap-2">
            <span className="text-5xl font-semibold">
              {t("findobsandcompanies.title")}
            </span>
            <div className="relative">
              <span className="text-5xl font-semibold text-primary">
                {title}
              </span>
              <div className="absolute top-10 w-[220px] h-10">
                <Image
                  src="/images/pattern2.png"
                  alt="/images/pattern2.png"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500">{subTitle}</div>
        </div>
        <div>
          <FormSearchDynamic
            description={
              type === "company"
                ? t("findobsandcompanies.input-search.descCompanies")
                : t("findobsandcompanies.input-search.descJob")
            }
            form={formSearch}
            onSubmitSearch={onSubmitSearch}
            placeholderSearch={
              type === "company"
                ? t("findobsandcompanies.input-search.placeholderCompanies")
                : t("findobsandcompanies.input-search.placeholderJob")
            }
            placeholderOption={t(
              "findobsandcompanies.input-search.placeholder"
            )}
          />
        </div>
      </div>
      <div className="mt-20 mb-16 px-32 flex flex-row items-start gap-10">
        <div className="w-1/5">
          <FormFilterDynamic
            form={formFilters}
            onReset={handleResetFilter}
            checkboxForm={filterForms}
            onSubmit={onSubmitFilters}
          />
        </div>
        <div className="w-4/5">
          <div className="mb-8">
            <div className="text-3xl font-semibold">
              {t("findobsandcompanies.title2")}{" "}
              {type === "job"
                ? t("findobsandcompanies.title2jobs")
                : t("findobsandcompanies.title2companies")}
            </div>
            <div className="text-muted-foreground">
              {t("findobsandcompanies.subTitle2showing")} {data.length}{" "}
              {t("findobsandcompanies.subTitle2result")}
            </div>
          </div>
          {loading ? (
            Array(4)
              .fill(4)
              .map((_, i) => <SkeletonJob key={i} />)
          ) : data?.length > 0 ? (
            <>
              {type === "job" ? (
                <div className="grid grid-cols-1 gap-7">
                  {data?.map((item: any, i: number) => (
                    <JobCard key={i} {...item} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-7">
                  {data?.map((item: any, i: number) => (
                    <CompanyCard key={i} {...item} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <EmptyData />
          )}
        </div>
      </div>
    </>
  );
}
