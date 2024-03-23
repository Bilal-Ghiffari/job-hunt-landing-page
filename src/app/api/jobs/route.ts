import { generateQueryCondition } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const searchParams = new URL(request.url);
  const queryConditions = {
    category: generateQueryCondition("category", "CategoryJob", searchParams),
    typeJob: generateQueryCondition("typeJob", "TypeJob", searchParams),
  };

  const whereQuery: Prisma.JobWhereInput = Object.values(
    queryConditions
  ).reduce((acc, condition) => ({ ...acc, ...condition }), {});

  const search = searchParams.searchParams.get("search")!!;
  const location = searchParams.searchParams.get("location")!!;

  const rolesCondition: Prisma.JobWhereInput =
    search?.length > 0 || location?.length > 0
      ? {
          OR: [
            {
              roles: {
                startsWith: search ?? "",
                mode: "insensitive",
              },
            },
            {
              Company: {
                Companyoverview: {
                  every: {
                    location: location ?? "",
                  },
                },
              },
            },
          ],
          AND: [
            {
              roles: {
                startsWith: search ?? "",
                mode: "insensitive",
              },
            },
            {
              Company: {
                Companyoverview: {
                  every: {
                    location: location ?? "",
                  },
                },
              },
            },
          ],
        }
      : {};
  const jobs = await prisma.job.findMany({
    where: {
      ...whereQuery,
      ...rolesCondition,
    },
    include: {
      CategoryJob: true,
      TypeJob: true,
      Company: {
        include: {
          Companyoverview: true,
        },
      },
    },
  });

  return NextResponse.json(jobs);
}
