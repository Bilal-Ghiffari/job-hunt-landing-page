import Clients from "@/components/organisme/Clients";
import HeroComponent from "@/components/organisme/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-32 mb-10">
      <HeroComponent />
      <Clients />
    </div>
  );
}
