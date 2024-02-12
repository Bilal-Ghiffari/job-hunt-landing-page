import LatestJobs from "@/components/organisme/LatestJobs";
import BannerSignUp from "@/components/organisme/BannerSignUp";
import Category from "@/components/organisme/Category";
import Clients from "@/components/organisme/Clients";
import FeaturedJobs from "@/components/organisme/FeaturedJobs";
import HeroComponent from "@/components/organisme/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen absolute top-0 -z-10" />
      <div className="absolute w-2/3 h-screen top-0 right-0 -z-10">
        <Image
          src="/images/pattern.png"
          alt="/images/pattern.png"
          width="3988"
          height="3176"
        />
      </div>
      <div className="px-32 mb-10">
        <HeroComponent />
        <Clients />
        <Category />
        <BannerSignUp />
        <FeaturedJobs />
        <div className="mt-32">
          <LatestJobs />
        </div>
      </div>
    </>
  );
}
