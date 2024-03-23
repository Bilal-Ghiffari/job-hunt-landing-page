import React from "react";
import { CompanyType } from "../../../../types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface CompanyCardTypes extends CompanyType {}

export default function CompanyCard({
  id,
  description,
  image,
  name,
  totalJobs,
  industry,
}: CompanyCardTypes) {
  const router = useRouter();
  return (
    <div
      className="border border-border p-6 cursor-pointer"
      onClick={() => router.push("/detail/company/" + id)}
    >
      <div className="flex flex-row justify-between items-start">
        <Image src={image} alt={image} width={66} height={66} />
        <Badge>{totalJobs} Jobs</Badge>
      </div>
      <div className="my-4">
        <div className="text-lg font-semibold mb-2">{name}</div>
        <div
          className="line-clamp-3 text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      <div className="space-x-2">
        <Badge variant="outline">{industry}</Badge>
      </div>
    </div>
  );
}
