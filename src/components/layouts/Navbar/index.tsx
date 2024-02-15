"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuAuth from "@/components/organisme/MenuAuth";

type Props = {};

export default function NavbarComponent({}: Props) {
  const { data: session, status } = useSession();
  console.log("session", session);
  // console.log("authenticated", status ==== "");
  const router = useRouter();
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
            Find Jobs
          </Link>
          <Link
            href="/find-companies"
            className="font-medium text-gray-400 cursor-pointer"
          >
            Browse Companies
          </Link>
        </div>
      </div>
      <div className="inline-flex items-center gap-4 h-8">
        {status === "authenticated" ? (
          <MenuAuth />
        ) : (
          <>
            <Button variant="link" onClick={() => router.push("/auth/signin")}>
              Login
            </Button>
            <Button onClick={() => router.push("/auth/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
