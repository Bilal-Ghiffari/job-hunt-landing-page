import React from "react";
import TitleSection from "../../atoms/TitleSection";
import JobItem from "./JobItem";

type Props = {};

export default function LatestJobs({}: Props) {
  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection word1="Latest" word2="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {[0, 1, 2].map((item: number) => (
          <JobItem
            key={item}
            categories={["Marketing", "Design"]}
            image="/images/company2.png"
            jobType="Internship"
            location="Paris, France"
            name="Social Media Assistant"
            type="Agency"
          />
        ))}
      </div>
    </div>
  );
}
