import Image from "next/image";
import React from "react";
import { Button } from "../../ui/button";

type Props = {};

export default function NavbarComponent({}: Props) {
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
          <span className="font-medium text-gray-400 mr-4 cursor-pointer">
            Find Jobs
          </span>
          <span className="font-medium text-gray-400 cursor-pointer">
            Browse Companies
          </span>
        </div>
      </div>
      <div className="inline-flex items-center gap-4 h-8">
        <Button variant="link">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
