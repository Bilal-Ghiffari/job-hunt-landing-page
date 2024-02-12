"use client";

import React from "react";
import { CompanyType, filterFormType } from "../../../../types";
import { CATEGORIES_OPTIONS } from "@/constant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formFilterCompanySchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ExploreDataContainer from "@/container/ExploreDataContainer";

type Props = {};

const filterForms: filterFormType[] = [
  {
    label: "Industry",
    name: "industry",
    items: CATEGORIES_OPTIONS,
  },
];

const dynamicDataCompany: CompanyType[] = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ipsam molestias eligendi impedit error quibusdam vero harum numquam perspiciatis incidunt.",
    categories: "Marketing",
    image: "/images/company2.png",
    totalJobs: 10,
    name: "Social Media Assistant",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ipsam molestias eligendi impedit error quibusdam vero harum numquam perspiciatis incidunt.",
    categories: "Marketing",
    image: "/images/company2.png",
    totalJobs: 10,
    name: "Social Media Assistant",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ipsam molestias eligendi impedit error quibusdam vero harum numquam perspiciatis incidunt.",
    categories: "Marketing",
    image: "/images/company2.png",
    totalJobs: 10,
    name: "Social Media Assistant",
  },
];

export default function FindCompanies({}: Props) {
  const forms = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const onSubmit = async (val: z.infer<typeof formFilterCompanySchema>) => {
    console.log("val", val);
  };

  return (
    <ExploreDataContainer
      data={dynamicDataCompany}
      filterForms={filterForms}
      formFilter={forms}
      loading={false}
      onSubmitFilter={onSubmit}
      subTitle="Find the dreame companies you dream work for"
      title="dream companies"
      type="company"
    />
  );
}
