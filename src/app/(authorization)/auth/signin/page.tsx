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
import { formSignInSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

export default function SignInPage({}: Props) {
  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });
  const router = useRouter();
  const onSubmit = async (val: z.infer<typeof formSignInSchema>) => {
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });
    if (authenticated?.error) {
      toast({
        title: "Error",
        description: "Email or password maybe wrong",
      });
      return;
    }
    router.push("/");
  };
  const onSubmitSigninWithGoogle = async () => {
    const authenticated = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });

    if (authenticated?.error) {
      toast({
        title: "Error",
        description: "Email or password maybe wrong",
      });
      return;
    }
  };
  return (
    <div>
      <div className="text-3xl text-center font-semibold mb-7">
        Welcome Back, Dude
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
      <Button onClick={onSubmitSigninWithGoogle} className="w-full mt-3">
        Sign In with Google
      </Button>
      <div className="text-gray-500 text-sm mt-6">
        don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-primary font-medium">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
