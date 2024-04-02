import FormModalApply from "@/components/organisme/FormModalApply";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { authOptions, formatDate } from "@/lib/utils";
import { getApplicantById } from "@/serverside/getApplicantById";
import { getDetaiJob } from "@/serverside/getDetailJob";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";

export default async function DetailPaageJob({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const data: any = await getDetaiJob(params.id);
  const { isApply } = await getApplicantById(params.id);
  const companyOverview = data?.Company?.Companyoverview[0];

  return (
    <>
      <div className="bg-slate-100 px-32 pt-10 pb-14">
        <div className="inline-flexx gap-3 text-sm text-muted-foreground"></div>
        <div className="bg-white shadow mt-10 p-5 w-11/12 mx-auto flex flex-row justify-between items-center">
          <div className="inline-flex items-center gap-5">
            <Image src={data?.image} alt={data?.image} width={88} height={88} />
            <div>
              <div className="text-2xl font-semibold">{data?.roles}</div>
              <div className="text-muted-foreground">
                {companyOverview?.industry} . {companyOverview?.location} .{" "}
                {data?.TypeJob.name}
              </div>
            </div>
          </div>
          {session?.user ? (
            <>
              {isApply ? (
                <Button
                  size="lg"
                  disabled
                  className="text-lg px-12 py-6 bg-green-500"
                >
                  Applied
                </Button>
              ) : (
                <FormModalApply
                  id={params?.id}
                  image={data?.image}
                  industry={
                    companyOverview?.industry ?? "data industry not found"
                  }
                  jobType={data?.TypeJob.name ?? "data industry not found"}
                  location={
                    companyOverview?.location ?? "data location not found"
                  }
                  roles={data?.roles ?? "data roles not found"}
                />
              )}
            </>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="lg" className="text-lg px-12 py-6">
                  Apply
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Let&apos;s join Job Hunt</AlertDialogTitle>
                  <AlertDialogDescription>
                    Log in first to enter this page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Link href="/auth/signin">
                    <AlertDialogAction>Log In</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <div className="px-32 py-16 flex flex-row items-start gap-10">
        <div className="w-3/4">
          <div className="mb-16">
            <div className="text-4xl font-semibold mb-3">Description</div>
            <div
              className="text-muted-foreground text-justify"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold mb-3">Responsibilitas</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.responsibility }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold mb-3">Who You Are</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.whoYouAre }}
            ></div>
          </div>
          <div className="mb-16">
            <div className="text-4xl font-semibold mb-3">Nice To Haves</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: data?.niceToHaves }}
            ></div>
          </div>
        </div>
        <div className="w-1/4">
          <div>
            <div className="text-3xl font-semibold">About this role</div>
            <div className="mt-6 p-4 bg-slate-50">
              <div className="mb-2">
                <span className="font-semibold">
                  {data?.applicants} Applied
                </span>{" "}
                <span className="text-gray-600">of {data?.needs} capacity</span>
              </div>
              <Progress value={(data?.applicants / data?.needs) * 100} />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Apply Before</div>
                <div className="font-semibold">
                  {formatDate(data?.dueDate!!)}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Posted On</div>
                <div className="font-semibold">
                  {formatDate(data?.datePosted)}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Job Type</div>
                <div className="font-semibold">{data?.TypeJob.name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500">Salary</div>
                <div className="font-semibold">
                  {data?.salaryFrom} - ${data?.salaryTo} USD
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <div className="text-3xl font-semibold">Category</div>
            <div className="my-5 inline-flex gap-4">
              <Badge>{data?.CategoryJob?.name}</Badge>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <div className="text-3xl font-semibold">Required Skills</div>
            <div className="my-5 inline-flex gap-4 flex-wrap">
              {data?.requiredSkills?.map((item: string, i: number) => (
                <Badge variant="outline" key={item + i}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-32 pb-20">
        <Separator className="mb-14" />
        <div className="mb-10">
          <div className="font-semibold text-3xl">Perks & Benefits</div>
          <div className="text-gray-500 mt-1">
            This job with saveral perks and benefits
          </div>
        </div>
        <div className="grid grid-cols-5 gap-10">
          {data?.benefits?.map((item: any, i: number) => (
            <div key={item.benefit + i}>
              <BiCategory className="w-12 h-12 text-primary" />
              <div className="font-semibold text-lg mt-6">{item?.benefit}</div>
              <div className="mt-3 text-sm text-gray-500">
                {item?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
