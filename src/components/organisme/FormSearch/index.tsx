import { Input } from "@/components/ui/input";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Button } from "@/components/ui/button";

type Props = {};

export default function FormSearch({}: Props) {
  return (
    <>
      <div className="mt-6 p-4 bg-background shadow-md inline-flex items-center gap-4 relative w-max z-10">
        <div className="inline-flex gap-3 items-center">
          <AiOutlineSearch className="w-6 h-6" />
          <Input
            className="py-6 w-[300px] border-none"
            placeholder="Job Title or keyword"
          />
        </div>
        <div className="inline-flex gap-3 items-center">
          <HiOutlineLocationMarker className="w-6 h-6" />
          <Select>
            <SelectTrigger className="w-[300px] border-none text-gray-500 outline-none py-6">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button className="py-6 px-8 text-lg">Search my job</Button>
        </div>
      </div>
      <div>
        <div className="text-muted-foreground mt-3">
          Popular : UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
    </>
  );
}
