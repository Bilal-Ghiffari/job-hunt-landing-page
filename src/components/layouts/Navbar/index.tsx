"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

export default function NavbarComponent({}: Props) {
  const router = useRouter();
  return (
    <header className="px-32 py-5 flex flex-row items-start justify-between">
      <div className="inline-flex items-center gap-12">
        <div>
          <Image
            src="/images/logo2.png"
            alt="/images/logo2.png"
            width={160}
            height={36}
          />
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
        <Button variant="link" onSubmit={() => router.push("/auth/signin")}>
          Login
        </Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
