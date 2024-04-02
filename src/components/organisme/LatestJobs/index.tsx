import { GetLatestDataJobs } from "@/serverside/getLatestDataJobs";
import { LatestDataJobsType } from "../../../../types";
import TitleSection from "../../atoms/TitleSection";
import JobItem from "./JobItem";

type Props = {};
export default async function LatestJobs({}: Props) {
  const data: LatestDataJobsType[] | undefined = await GetLatestDataJobs();
  return (
    <div className="py-16 mb-10 relative">
      <TitleSection word1="Latest" word2="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {data?.map((item: LatestDataJobsType) => (
          <JobItem
            key={item.id + item.name}
            category={item.category}
            image={item.image}
            jobType={item.jobType}
            location={item.location}
            name={item.name}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}
