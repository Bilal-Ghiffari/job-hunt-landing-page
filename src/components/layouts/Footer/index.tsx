import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const aboutLinks = [
  "Companies",
  "Pricing",
  "Terms",
  "Advice",
  "Privacy Policy",
];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];
const socialMediaLinks = [
  "/images/soc-Facebook.png",
  "/images/soc-Instagram.png",
  "/images/soc-LinkedIn.png",
  "/images/soc-Twitter.png",
  "/images/soc-Dribbble.png",
];

export default function Footer({}: Props) {
  return (
    <div className="bg-slate-900 px-32 pt-16 pb-11">
      <div className="flex flex-row items-start justify-between">
        <div id="section-logo">
          <Image
            src="/images/logo.png"
            alt="/images/logo.png"
            width={160}
            height={36}
          />
          <div className="text-muted mt-8">
            Greate platfrom for the job seeker that <br />
            passionate about startups. Finds your dream job <br />
            easier.
          </div>
        </div>
        <div id="section-about">
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            <div className="space-y-4">
              {aboutLinks.map((item: string, i: number) => (
                <Link className="block text-muted" key={i} href="/">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div id="section-resource">
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            <div className="space-y-4">
              {resourceLinks.map((item: string, i: number) => (
                <Link className="block text-muted" key={i} href="/">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div id="section-input">
          <div className="text-lg text-primary-foreground font-semibold mb-5">
            Get job notification
          </div>
          <div className="text-muted">
            The latest job news, articles, sent to <br /> your inbox weekly
          </div>
          <div className="mt-10 inline-flex items-center gap-3">
            <Input placeholder="Email Address" className="py-5" />
            <Button className="py-5">Subscribe</Button>
          </div>
        </div>
      </div>
      <Separator className="mt-20 mb-11 bg-gray-400" />
      <div className="flex flex-row items-center justify-between">
        <div className="text-slate-600">
          2021 @ JobHuntly. All rights reserved.
        </div>
        <div className="space-x-3">
          {socialMediaLinks.map((item: string, i: number) => (
            <Image
              className="inline"
              src={item}
              alt={item}
              width={32}
              height={32}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
