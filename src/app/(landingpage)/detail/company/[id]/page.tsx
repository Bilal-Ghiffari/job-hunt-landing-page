import LatestJobs from "@/components/organisme/LatestJobs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineFire } from "react-icons/ai";
import prisma from "../../../../../../lib/prisma";
import { supabasePublicUrl } from "@/lib/supabase";
import { formatDate, parsingSocialMedia } from "@/lib/utils";
import { CompanySocialMedia } from "@prisma/client";
import { CompanyTeamType } from "../../../../../../types";

type Props = {
  id: string;
};

interface TypeParams {
  params: Props;
}

async function getDetailCompany(id: string) {
  const data = await prisma.company.findFirst({
    where: { id },
    include: {
      Companyoverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });
  const overviewCompany = data?.Companyoverview[0];
  let imageUrl;
  if (overviewCompany?.image) {
    imageUrl = await supabasePublicUrl(overviewCompany?.image, "company");
  } else {
    imageUrl = "/images/company2.png";
  }

  return {
    ...data,
    imageUrl,
    Companyoverview: overviewCompany,
  };
}

export default async function DetailCompany({ params }: TypeParams) {
  const data = await getDetailCompany(params.id);
  const socialMedia = parsingSocialMedia(data?.CompanySocialMedia ?? []);

  const parsingDetailCompany = [
    {
      title: "Founded",
      subTitle: data?.Companyoverview?.dateFounded,
      icon: <FaCalendarAlt className="w-6 h-6 text-primary" />,
    },
    {
      title: "Employes",
      subTitle: data?.Companyoverview?.employes,
      icon: <FaUsers className="w-6 h-6 text-primary" />,
    },
    {
      title: "Location",
      subTitle: data?.Companyoverview?.location,
      icon: <FaLocationDot className="w-6 h-6 text-primary" />,
    },
  ];
  return (
    <>
      <div className="bg-slate-100 px-32 pt-16 pb-14">
        <div>
          <div className="mt-10 inline-flex gap-6 items-center">
            <Image
              src={data?.imageUrl}
              alt={data?.imageUrl}
              width={150}
              height={150}
            />
            <div>
              <div className="inline-flex gap-4 items-center">
                <span className="text-4xl font-semibold">
                  {data.Companyoverview?.name}
                </span>
                <Badge>{data?._count?.Job} Jobs</Badge>
              </div>
              <div className="mt-2">
                <Link href="/" className="font-semibold text-primary">
                  {data?.Companyoverview?.website}
                </Link>
              </div>
              <div className="inline-flex items-center gap-10 mt-6">
                {parsingDetailCompany.map((item: any, i: number) => (
                  <div
                    className="inline-flex items-center gap-3"
                    key={item + i}
                  >
                    <div>
                      <div className="bg-white p-3 rounded-full">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">{item.title}</div>
                      <div className="font-semibold">
                        {item.title === "Founded"
                          ? formatDate(item.subTitle, "MMMM, DD YYYY")
                          : item.subTitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-32 py-16 flex flex-row items-start gap-10">
        <div className="w-3/4">
          <div className="mb-16" id="description">
            <div className="text-3xl font-semibold mb-3">Company Profile</div>
            <div
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: data?.Companyoverview?.description!!,
              }}
            ></div>
          </div>
          <div id="contact">
            <div className="text-3xl font-semibold mb-4">Contact</div>
            <div className="flex items-center gap-5 w-[400px] flex-wrap">
              {socialMedia?.map((item: string, i: number) => (
                <div
                  className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold"
                  key={item + i}
                >
                  {/* <FacebookIcon /> */}
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="text-3xl font-semibold mb-4">Tech Stack</div>
          <div className="text-gray-500 text-sm">
            Learn about the technology and tools that Pattern use.
          </div>
          <div className="mt-5 flex flex-row flex-wrap items-center gap-4">
            {data.Companyoverview?.techStack.map((item: string, i: number) => (
              <Badge key={item + i}>{item}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="px-32">
        <Separator />
        <div className="my-16">
          <div className="text-3xl font-semibold mb-4">Teams</div>
          <div className="grid grid-cols-5 gap-5 mt-5">
            {data?.CompanyTeam?.map((item: CompanyTeamType) => (
              <div key={item.id} className="border border-border px-3 py-5">
                <div className="w-16 h-16 rounded-full mx-auto bg-gray-300" />
                <div className="text-center my-4">
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.position}</div>
                </div>
                <div className="mx-auto w-max">
                  <div className="inline-flex gap-2">
                    <InstagramIcon className="w-4 h-4 text-gray-500" />
                    <LinkedinIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="px-32">
        <LatestJobs />
      </div>
    </>
  );
}
