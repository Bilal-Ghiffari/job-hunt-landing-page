import React from "react";
import { JobItemType } from "../../../../types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface TypeJobCard extends JobItemType {}

export default function JobCard({
  applicants,
  skills,
  image,
  jobType,
  location,
  name,
  needs,
  type,
}: TypeJobCard) {
  const router = useRouter();
  return (
    <div className="w-full border mb-5 p-6 border-border flex flex-row justify-between items-center">
      <div className="flex flex-row items-start gap-6">
        <div>
          <Image src={image} alt={image} width={64} height={64} />
        </div>
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground pb-2">
            {type} . {location}
          </div>
          <div className="h-5 inline-flex gap-2 items-center">
            <Badge variant="secondary" className="rounded-none ">
              {jobType}
            </Badge>
            <Separator orientation="vertical" />
            {skills.slice(0, 2).map((item: string, i: number) => (
              <Badge key={i} className="rounded-sm" variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[200px]">
        <Button
          onClick={() => router.push("/detail/job/1")}
          className="w-full"
          size="lg"
        >
          Apply
        </Button>
        <Progress
          value={(applicants / needs) * 100}
          className="mt-2 bg-green-500"
        />
        <div className="text-gray-500 text-sm text-center mt-2">
          <span className="text-black font-semibold">
            {applicants} appliend
          </span>{" "}
          of {needs} capacity
        </div>
      </div>
    </div>
  );
}
