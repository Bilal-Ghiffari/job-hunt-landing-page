import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { JobItemType, categoryJobType, optionType } from "../../types";
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
        // console.log("data jobs", item);
        const jobs: JobItemType = {
          applicants: item?.applicants,
          categories: item?.CategoryJob,
          image: imageUrl,
          jobType: item?.jobType,
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

export const parsingCategoriesToOptions = (
  data: any,
  isLoading: boolean,
  error: Error,
  isIndustry?: boolean,
) => {
  if (!isLoading && !error && data.length > 0) {
    return data.map((item: { id: string, name: string}) => {
      return {
        id: isIndustry ? item.name : item.id,
        label: item.name,
      } as optionType;
    }) as optionType[];
  }
  return [];
};
