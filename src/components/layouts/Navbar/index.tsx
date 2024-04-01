"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuAuth from "@/components/organisme/MenuAuth";
import SwitchTranslation from "@/components/atoms/Switchtranslation";
import { useTranslation } from "react-i18next";

type Props = {};

export default function NavbarComponent({}: Props) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <header className="px-32 py-5 flex flex-row items-start justify-between">
      <div className="inline-flex items-center gap-12">
        <div>
          <Link href={"/"}>
            <Image
              src="/images/logo2.png"
              alt="/images/logo2.png"
              width={160}
              height={36}
            />
          </Link>
        </div>
        <div>
          <Link
            href="/find-jobs"
            className="font-medium text-gray-400 mr-4 cursor-pointer"
          >
            {t("navbar.nav-item-1")}
          </Link>
          <Link
            href="/find-companies"
            className="font-medium text-gray-400 cursor-pointer"
          >
            {t("navbar.nav-item-2")}
          </Link>
        </div>
      </div>
      <div className="inline-flex items-center gap-4">
        <div className="inline-flex items-center gap-4 h-8">
          {status === "authenticated" ? (
            <MenuAuth />
          ) : (
            <>
              <Button
                variant="link"
                onClick={() => router.push("/auth/signin")}
              >
                {t("navbar.btn-signin")}
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                {t("navbar.btn-signup")}
              </Button>
            </>
          )}
        </div>
        <SwitchTranslation />
      </div>
    </header>
  );
}
