import { BiCategory } from "react-icons/bi";
import { HiOutlineArrowRight } from "react-icons/hi";

type Props = {
  name: string;
  totalJobs: number;
};

export default function CategoryItem({ name, totalJobs }: Props) {
  console.log("namecateg", name);
  return (
    <div className="border border-border p-8 cursor-pointer transition-colors group hover:border-primary hover:bg-primary hover:text-white">
      <BiCategory className="w-12 h-12 text-primary group-hover:text-white" />
      <div className="mt-7">
        <div className="text-2xl font-semibold">{name}</div>
        <div className="text-muted-foreground inline-flex gap-1 items-center mt-1 group-hover:text-white">
          <span>{totalJobs} jobs available</span>
          <HiOutlineArrowRight className="hover:text-white" />
        </div>
      </div>
    </div>
  );
}
