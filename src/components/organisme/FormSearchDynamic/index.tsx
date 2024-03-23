import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATION_OPTIONS } from "@/constant";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Separator } from "@/components/ui/separator";
import { optionType } from "../../../../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  form: any;
  onSubmitSearch: (val: any) => Promise<void>;
  description: string;
};

export default function FormSearchDynamic({
  description,
  form,
  onSubmitSearch,
}: Props) {
  return (
    <div className="mx-auto w-max">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitSearch)}>
          <div className="p-4 bg-background shadow-md inline-flex items-center gap-4 relative w-max z-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex gap-3 items-center">
                      <AiOutlineSearch className="w-6 h-6" />
                      <Input
                        className="py-5 w-[350px] border-none"
                        placeholder="Job Title or keyword"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator orientation="vertical" />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="inline-flex gap-3 items-center">
                    <HiOutlineLocationMarker className="w-6 h-6" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[350px] border-none text-gray-500 outline-none py-5">
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((item: optionType, i: number) => (
                          <SelectItem key={i} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className="py-5 px-4 text-sm">Search</Button>
            </div>
          </div>
        </form>
      </Form>
      <div>
        <div className="text-muted-foreground mt-3">{description}</div>
      </div>
    </div>
  );
}
