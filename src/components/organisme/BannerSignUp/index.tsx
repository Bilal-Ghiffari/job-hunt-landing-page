"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type Props = {};

export default function BannerSignUp({}: Props) {
  const { t } = useTranslation();
  return (
    <div className="mt-32 mb-10 bg-primary text-primary-foreground px-16 pt-16 flex flex-row justify-between items-start">
      <div>
        <div className="text-5xl font-semibold">
          {t("banner.title-1")} <br /> {t("banner.title-2")}
        </div>
        <div className="my-6">{t("banner.desc")}</div>
        <Button
          size="lg"
          variant="secondary"
          className="hover:text-primary text-primary"
        >
          {t("banner.btn-text")}
        </Button>
      </div>
      <div>
        <Image
          src="/images/dashboard.png"
          alt="image-dashboard"
          height={300}
          width={500}
        />
      </div>
    </div>
  );
}
