import Image from "next/image";
import React from "react";
import { JobItemType, LatestDataJobsType } from "../../../../../types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props extends LatestDataJobsType {}

export default function JobItem({
  category,
  image,
  jobType,
  location,
  name,
  type,
}: Props) {
  return (
    <div className="border border-border p-8 flex flex-row items-start gap-6 cursor-pointer">
      <div>
        <Image src={image} width={64} height={64} alt={image} />
      </div>
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {type} . {location}
        </div>
        <div className="h-5 inline-flex gap-2 items-center">
          <Badge variant="secondary">{jobType}</Badge>
          <Separator orientation="vertical" />
          <Badge
            variant="outline"
            className="border-primary bg-primary/5 text-primary"
          >
            {category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
