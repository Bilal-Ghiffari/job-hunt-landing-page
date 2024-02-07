import FormFilterDynamic from "@/components/organisme/FormFilterDynamic";
import FormSearchDynamic from "@/components/organisme/FormSearchDynamic";
import Image from "next/image";
import React from "react";
import { filterFormType } from "../../../types";
import JobCard from "@/components/organisme/JobCard";
import CompanyCard from "@/components/organisme/CompanyCard";

type Props = {
  formFilter: any;
  onSubmitFilter: (val: any) => Promise<void>;
  filterForms: filterFormType[];
  loading: boolean;
  title: string;
  subTitle: string;
  data: any[];
  type: "job" | "company";
};

export default function ExploreDataContainer({
  filterForms,
  formFilter,
  onSubmitFilter,
  loading,
  title,
  subTitle,
  data,
  type,
}: Props) {
  return (
    <>
      <div className="bg-gray-200 px-32 pt-16 pb-14">
        <div className="mb-10">
          <div className="mx-auto mb-11 text-center flex justify-center gap-2">
            <span className="text-5xl font-semibold">Find Your</span>
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
          <FormSearchDynamic />
        </div>
      </div>
      <div className="mt-20 mb-16 px-32 flex flex-row items-start gap-10">
        <div className="w-1/5">
          <FormFilterDynamic
            filterForms={filterForms}
            formFilter={formFilter}
            onSubmitFilter={onSubmitFilter}
          />
        </div>
        <div className="w-4/5">
          <div className="mb-8">
            <div className="text-3xl font-semibold">
              All {type === "job" ? "Jobs" : "Companies"}
            </div>
            <div className="text-muted-foreground">
              Showing {data.length} Result
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
