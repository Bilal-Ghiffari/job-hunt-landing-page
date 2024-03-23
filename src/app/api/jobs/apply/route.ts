import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await prisma.aplicant.create({
    data: body,
  });

  await prisma.job.update({
    where: {
      id: body.jobId,
    },
    data: {
      applicants: {
        increment: 1,
      },
    },
  });
  return NextResponse.json(result);
}
