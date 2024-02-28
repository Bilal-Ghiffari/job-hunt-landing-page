import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filterCategory =
    searchParams.get("category") !== ""
      ? searchParams.get("category")?.split(",")
      : [];
  console.log("filterCategory", filterCategory);
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
  console.log("categoryQuery", categoryQuery);
  const company = await prisma.company.findMany({
    where: { ...categoryQuery },
    include: {
      Companyoverview: true,
      CompanyTeam: true,
      _count: { select: { Job: true } },
    },
  });

  return NextResponse.json(company);
}
