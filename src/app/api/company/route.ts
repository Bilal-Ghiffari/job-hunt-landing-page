import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filterCategory =
    searchParams.get("category") !== ""
      ? searchParams.get("category")?.split(",")
      : [];
  const categoryQuery: Prisma.CompanyWhereInput =
    filterCategory && filterCategory.length > 0
      ? {
          Companyoverview: {
            every: {
              industry: { in: filterCategory },
            },
          },
        }
      : {};
  const search = searchParams.get("search")!!;
  const location = searchParams.get("location")!!;
  const companyCondition: Prisma.CompanyWhereInput =
    search?.length > 0 || location?.length > 0
      ? {
          OR: [
            {
              Companyoverview: {
                every: {
                  name: {
                    startsWith: search ?? "",
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              Companyoverview: {
                every: {
                  location: location ?? "",
                },
              },
            },
          ],
          AND: [
            {
              Companyoverview: {
                every: {
                  name: {
                    startsWith: search ?? "",
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              Companyoverview: {
                every: {
                  location: location ?? "",
                },
              },
            },
          ],
        }
      : {};
  const company = await prisma.company.findMany({
    where: { ...categoryQuery, ...companyCondition },
    include: {
      Companyoverview: true,
      CompanyTeam: true,
      _count: { select: { Job: true } },
    },
  });

  return NextResponse.json(company);
}
