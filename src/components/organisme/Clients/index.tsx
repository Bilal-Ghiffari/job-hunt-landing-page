import Image from "next/image";
import React from "react";

type Props = {};
const clients = [
  "/images/jobox.png",
  "/images/dsign.png",
  "/images/wave.png",
  "/images/twins.png",
  "/images/bubles.png",
];

export default function Clients({}: Props) {
  return (
    <div>
      <div className="relative z-10">
        <div className="text-lg font-medium text-muted-foreground">
          Companies we helped grow
        </div>
        <div className="mt-8 flex flex-row justify-between">
          {clients.map((item: string, i: number) => (
            <Image src={item} key={i} alt={item} width={139} height={35} />
          ))}
        </div>
      </div>
    </div>
  );
}
