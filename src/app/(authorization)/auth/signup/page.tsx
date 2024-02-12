"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSignUpSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export default function SignUpPage({}: Props) {
  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
  });
  const onSubmit = (val: z.infer<typeof formSignUpSchema>) => {
    console.log("val", val);
  };
  return (
    <div>
      <div className="text-3xl text-center font-semibold mb-7">
        Get more opportunities
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="text-gray-500 text-sm mt-6">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary font-medium">
          Sign In
        </Link>
      </div>
      <div className="text-gray-500 text-sm mt-10">
        By clicking `Continue`, you acknowlege that you have read accept the{" "}
        <span className="text-primary font-medium">Terms of Service</span> and{" "}
        <span className="text-primary font-medium">Privacy Policy</span>
      </div>
    </div>
  );
}
