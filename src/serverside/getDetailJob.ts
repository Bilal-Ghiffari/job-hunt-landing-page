import { authOptions, getImageInPrisma } from "@/lib/utils";
import { JsonArray } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";

export const revalidate = 0;
export async function getDetaiJob(id: string) {
  const session = await getServerSession(authOptions);
  const data = await prisma.job.findFirst({
    where: {
      id,
    },
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
  const image = data?.Company?.Companyoverview[0].image!!;
  const defaultImage = "/images/company2.png";
  const imageUrl = await getImageInPrisma(image, defaultImage);
  const applicants = data?.applicants || 0;
  const needs = data?.needs || 0;

  if (!session) {
    return {
      ...data,
      image: imageUrl,
      benefits: data?.benefits as JsonArray,
      needs,
      applicants,
    };
  } else {
    return {
      ...data,
      image: imageUrl,
      benefits: data?.benefits as JsonArray,
      needs,
      applicants,
    };
  }
}
