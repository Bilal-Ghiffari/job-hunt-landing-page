import { Job } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getImageInPrisma } from "@/lib/utils";
import { LatestDataJobsType } from "../../types";

export const revalidate = 0;
export async function GetLatestDataJobs() {
  try {
    const data: Job[] = await prisma.job.findMany({
      orderBy: {
        datePosted: "desc",
      },
      take: 3,
      include: {
        Company: {
          include: {
            Companyoverview: true,
          },
        },
        CategoryJob: true,
        TypeJob: true,
      },
    });
    if (data.length > 0) {
      return await Promise.all(
        data.map(async (item: any) => {
          const defaultImage = "/images/company2.png";
          const imageUrl = await getImageInPrisma(
            item?.Company?.Companyoverview[0].image,
            defaultImage
          );
          return {
            id: item?.id,
            name: item?.roles,
            category: item?.CategoryJob?.name,
            image: imageUrl,
            jobType: item?.TypeJob?.name,
            location: item?.Company?.Companyoverview[0].location,
            type: item?.Company?.Companyoverview[0].industry,
          } as LatestDataJobsType;
        })
      );
    }
    return [];
  } catch (error) {
    console.log("error", error);
  }
}
