import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  const jobtype = await prisma.typeJob.findMany({
    include: {
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });
  return NextResponse.json(jobtype);
}
