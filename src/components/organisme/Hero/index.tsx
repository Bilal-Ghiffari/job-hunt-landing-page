"use client";

import React from "react";
import Image from "next/image";
import FormSearch from "../FormSearch";
import { useTranslation } from "react-i18next";

type Props = {};

export default function HeroComponent({}: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="w-1/2">
        <div className="text-7xl font-semibold text-slate-600 w-max relative">
          {t("hero.title-1")} <br /> {t("hero.title-2")} <br />{" "}
          <span className="text-primary">{t("hero.title-3")}</span>
        </div>
        <Image
          src="/images/pattern2.png"
          alt="image-hero-patter2"
          width={455}
          height={32}
          className="mb-5"
        />
        <div className="text-muted-foreground text-lg">{t("hero.desc")}</div>
        <FormSearch />
      </div>
      <div className="block mt-2">
        <Image
          src="/images/hero.png"
          alt="image-hero"
          width={501}
          height={710}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
