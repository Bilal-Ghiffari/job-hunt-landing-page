"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formApplySchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadField from "../UploadField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabaseUploadFile } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

type Props = {
  id: string;
  roles: string;
  industry: string;
  location: string;
  jobType: string;
  image: string;
};

export default function FormModalApply({
  id,
  roles,
  industry,
  location,
  jobType,
  image,
}: Props) {
  const { status, data: session } = useSession();
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formApplySchema>>({
    resolver: zodResolver(formApplySchema),
  });
  const onSubmit = async (val: z.infer<typeof formApplySchema>) => {
    setIsDisabled(true);
    try {
      const { error, filename } = await supabaseUploadFile(
        val.resume,
        "applicant"
      );
      if (error || !session?.user?.id) {
        throw "Error";
      }
      const bodyDataApply = {
        ...val,
        userId: session?.user.id,
        jobId: id,
        resume: filename,
      };

      await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyDataApply),
      });
      await toast({
        title: "Success",
        description: "Apply job success",
      });
      setIsDisabled(false);
      router.replace("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });
      setIsDisabled(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-12 py-6">
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen">
        <div className="overscroll-contain">
          <div className="inline-flex items-center gap-4">
            <div>
              <Image src={image} alt={image} width={60} height={60} />
            </div>
            <div>
              <div className="text-lg font-semibold">{roles}</div>
              <div className="text-gray-500">
                {industry} . {location} . {jobType}
              </div>
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="mb-5">
            <div className="font-semibold text-lg">Submit your application</div>
            <div className="text-gray-500 text-sm mt-2">
              The following is required and will only be shared with Nomad
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* {form.} */}
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your FullName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousJobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current of previous job title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="What's your current of previous job"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <h2 className="font-semibold">Links</h2>
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Link to your linked URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portofolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portofolio URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Link to your portofolio URL"
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="converLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a cover letter or anything else you mant to share"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <UploadField form={form} />
              <Button type="submit" className="w-full" disabled={disabled}>
                Apply
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
