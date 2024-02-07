"use client";

import ExploreDataContainer from "@/container/ExploreDataContainer";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formFilterSchema } from "@/lib/form-schema";
import { JobItemType, filterFormType } from "../../../types";
import { CATEGORIES_OPTIONS } from "@/constant";

type Props = {};

const filterForms: filterFormType[] = [
  {
    items: CATEGORIES_OPTIONS,
    label: "Categories",
    name: "categories",
  },
];

const dynamicDataJob: JobItemType[] = [
  {
    applicants: 5,
    desc: "lorem",
    categories: ["Marketing", "Design"],
    image: "/images/company2.png",
    jobType: "Full Time",
    location: "Paris, France",
    name: "Social Media Assistant",
    needs: 10,
    type: "Agency",
  },
];

export default function FindJobs({}: Props) {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    console.log("val", val);
  };
  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={filterForms}
      title="dream job"
      subTitle="Find your next career at companies like HubSpot, Nike, and Dropbox"
      loading={false}
      type="job"
      data={dynamicDataJob}
    />
  );
}
