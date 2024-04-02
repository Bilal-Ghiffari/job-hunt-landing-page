import { authOptions } from "@/lib/utils";
import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";

export const revalidate = 0;
export async function getApplicantById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      isApply: null,
    };
  }

  const isApply = await prisma.aplicant.findFirst({
    where: {
      userId: session?.user.id,
      jobId: id,
    },
  });

  return {
    isApply,
  };
}
