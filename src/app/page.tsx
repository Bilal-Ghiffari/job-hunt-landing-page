import BannerSignUp from "@/components/organisme/BannerSignUp";
import Category from "@/components/organisme/Category";
import Clients from "@/components/organisme/Clients";
import FeaturedJobs from "@/components/organisme/FeaturedJobs";
import HeroComponent from "@/components/organisme/Hero";

export default function Home() {
  return (
    <div className="px-32 mb-10">
      <HeroComponent />
      <Clients />
      <Category />
      <BannerSignUp />
      <FeaturedJobs />
    </div>
  );
}
