import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import { FeatureJobType, JobItemType } from "../../../../../types";

interface JobItem extends FeatureJobType {}

export default function ItemJob({
  categories,
  desc,
  image,
  jobType,
  location,
  name,
  type,
  skills,
}: JobItem) {
  console.log({ categories, desc, image, jobType, location, name, type });
  return (
    <div className="border border-border p-6 cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <Image src={image} alt={image} width={48} height={48} />
        <span className="px-4 py-1 text-xs font-semibold text-primary border border-primary">
          {jobType}
        </span>
      </div>
      <div className="my-4">
        <div className="font-semibold text-lg">{name}</div>
        <div className="text-muted-foreground">
          {type} . {location}
        </div>
      </div>
      <div
        className="text-muted-foreground h-12 line-clamp-2 text-ellipsis mb-4"
        dangerouslySetInnerHTML={{ __html: desc!! }}
      ></div>
      <div className="space-y-2 space-x-2 add:space-x-0">
        {skills.map((item: string, i: number) => (
          <Badge
            key={`${item}-${i}`}
            variant="outline"
            className="rounded border-primary bg-primary/5 text-primary"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
