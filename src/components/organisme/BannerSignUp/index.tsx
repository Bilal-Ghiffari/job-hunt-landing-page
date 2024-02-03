import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {};

export default function BannerSignUp({}: Props) {
  return (
    <div className="mt-32 mb-10 bg-primary text-primary-foreground px-16 pt-16 flex flex-row justify-between items-start">
      <div>
        <div className="text-5xl font-semibold">
          Start posting <br /> jobs today
        </div>
        <div className="my-6">Start posting job for only $16</div>
        <Button
          size="lg"
          variant="secondary"
          className="hover:text-primary text-primary"
        >
          Sign Up for Free
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
