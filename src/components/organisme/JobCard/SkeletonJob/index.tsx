import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function SkeletonJob({}: Props) {
  return (
    <div className="w-full border mb-5 p-6 border-gray-200 flex flex-row justify-between items-center">
      <div className="inline-flex items-start gap-4">
        <Skeleton className="w-20 h-20 rounded-full bg-gray-300" />
        <div>
          <Skeleton className="w-[120px] h-3 bg-gray-300" />
          <div className="mt-4 space-y-2">
            <Skeleton className="w-[250px] h-3 bg-gray-300" />
            <Skeleton className="w-[250px] h-3 bg-gray-300" />
            <Skeleton className="w-[250px] h-3 bg-gray-300" />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="w-[150px] h-[50px] bg-gray-300" />
      </div>
    </div>
  );
}
