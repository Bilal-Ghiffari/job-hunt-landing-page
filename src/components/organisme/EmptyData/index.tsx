import Image from "next/image";
import React from "react";

type Props = {};

export default function EmptyData({}: Props) {
  return (
    <div className="text-center">
      <Image
        className="block mx-auto"
        src="/images/nodata.png"
        alt="/images/nodata.png"
        width={200}
        height={200}
      />
      <div className="mt-3">
        <div className="text-2xl font-semibold">Data not found</div>
        <div className="text-gray-500">
          Double-check your input and try again.
        </div>
      </div>
    </div>
  );
}
