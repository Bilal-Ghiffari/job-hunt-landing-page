import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import {
  CompanySocmedType,
  CompanyType,
  JobItemType,
  categoryJobType,
  optionType,
} from "../../types";
import { string } from "zod";
import { Job } from "@prisma/client";
import { supabasePublicUrl } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomId = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUFWXYZabcdefghijklmnopqrstufwxyz12345678910";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const hashPassword = async (password: string) => {
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json() as Promise<JSON>;
}

export const parsingCategories = (
  data: any,
  isLoading: boolean,
  error: Error
) => {
  if (!isLoading && !error && data?.length > 0) {
    return data.map((item: categoryJobType) => {
      return {
        id: item?.id,
        name: item?.name,
        totalJobs: item?._count?.Job,
      };
    }) as categoryJobType[];
  }
  return [];
};

export const parsingJobs = async (
  data: any,
  isLoading: boolean,
  error: Error
) => {
  if (!isLoading && !error && data?.length > 0) {
    return await Promise.all(
      data?.map(async (item: any) => {
        let imageName = item.Company?.Companyoverview[0]?.image;
        let imageUrl;

        if (imageName) {
          imageUrl = await supabasePublicUrl(imageName, "company");
        } else {
          imageUrl = "/images/company2.png";
        }
        const jobs: JobItemType = {
          applicants: item?.applicants,
          categories: item?.CategoryJob,
          image: imageUrl,
          jobType: item?.TypeJob?.name,
          location: item?.Company?.Companyoverview[0]?.location,
          name: item?.roles,
          id: item?.id,
          desc: item?.description,
          needs: item?.needs,
          type: item?.CategoryJob?.name,
          skills: item?.requiredSkills,
        };
        return jobs;
      })
    );
  }
  return [];
};

export const parsingCompanies = async (
  data: any,
  isLoading: boolean,
  error: Error
) => {
  if (!isLoading && !error && data?.length > 0) {
    return await Promise.all(
      data?.map(async (item: any) => {
        let imageName = item.Companyoverview[0]?.image;
        let imageUrl;
        if (imageName) {
          imageUrl = await supabasePublicUrl(imageName, "company");
        } else {
          imageUrl = "/images/company2.png";
        }
        const companyDetail = item.Companyoverview[0];
        const company: CompanyType = {
          id: item.id,
          name: companyDetail?.name,
          dateFounded: companyDetail?.dateFounded,
          description: companyDetail?.description,
          employes: companyDetail?.employes,
          image: imageUrl,
          industry: companyDetail?.industry,
          location: companyDetail?.location,
          sosmed: item?.sosmed,
          teams: item?.CompanyTeam,
          techStack: companyDetail?.techStack,
          totalJobs: item?._count.Job,
          website: companyDetail?.website,
        };
        return company;
      })
    );
  }
  return [];
};

export const parsingCategoriesToOptions = (
  data: any,
  isLoading: boolean,
  error: Error,
  isIndustry?: boolean
) => {
  if (!isLoading && !error && data.length > 0) {
    return data.map((item: { id: string; name: string }) => {
      return {
        id: isIndustry ? item.name : item.id,
        label: item.name,
      } as optionType;
    }) as optionType[];
  }
  return [];
};

export const formatDate = (
  date: Date | string,
  format: string = "DD MMM YYYY"
) => {
  let getFormated;
  const dateNow: Date = new Date(Date.now());
  if (date !== "") {
    getFormated = dayjs(date).format(format);
  } else {
    getFormated = dayjs(dateNow).format(format);
  }
  return getFormated;
};

export const parsingSocialMedia = (data: CompanySocmedType[]) => {
  let newData: string[] = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const social = data[i];
      for (const key in social) {
        if (key !== "id" && key !== "companyId") {
          const value = social[key as keyof CompanySocmedType];
          newData.push(value);
        }
      }
    }
  }

  if (newData.length > 0) {
    return newData;
  }
  return [];
};

export const stringToObject = (val?: string | null) => {
  if (!val) {
    return val;
  }
  // {}, {}, {}
  const temp: string[] = val.split(",");
  const obj: any = {};
  let i = 0;
  while (i < temp.length) {
    obj[temp[i]] = temp[i + 1];
    i += 2;
  }
  return obj;
};
