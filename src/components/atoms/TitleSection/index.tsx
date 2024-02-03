import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

type Props = {
  word1: string;
  word2: string;
};

export default function TitleSection({ word1, word2 }: Props) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-4xl font-bold">
        {word1} <span className="text-primary">{word2}</span>
      </div>
      <div className="inline-flex gap-3 items-center text-center text-primary font-semibold cursor-pointer">
        <span>Show all jobs</span>
        <HiOutlineArrowRight />
      </div>
    </div>
  );
}
