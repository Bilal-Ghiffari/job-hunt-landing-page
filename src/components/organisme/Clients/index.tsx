"use client";

import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};
const clients = [
  "/images/jobox.png",
  "/images/dsign.png",
  "/images/wave.png",
  "/images/twins.png",
  "/images/bubles.png",
];

export default function Clients({}: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="relative z-10">
        <div className="text-lg font-medium text-muted-foreground">
          {t("client.title")}
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
