import TitleSection from "@/components/atoms/TitleSection";
import React from "react";
import ItemJob from "./ItemJob";

type Props = {};

export default function FeaturedJobs({}: Props) {
  return (
    <div className="mt-32 mb-10">
      <TitleSection word1="Featured" word2="jobs" />
      <div className="grid grid-cols-4 gap-8 mt-12">
        {[0, 1, 2].map((item: number) => (
          <ItemJob
            image="/images/company.png"
            jobType="Full Time"
            name="Email Marketing"
            type="Agency"
            location="Paris, France"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, libero aliquam. Sit corrupti numquam repudiandae tempore, dolorem quibusdam aperiam veniam. Pariatur illum fuga aliquam ab, eaque dolore modi quos iure?"
            categories={["Marketing", "Design"]}
          />
        ))}
      </div>
    </div>
  );
}
