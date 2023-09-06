"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Inputs = {
  name: string;
  picture: string;
  email: string;
  password: string;
};

const LogIn = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  const [targetFiles, setTargetFiles] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const info = {
      ...data,
    };
    localStorage.setItem("auth", JSON.stringify(info));
    const getItem = localStorage.getItem("auth");
    if (getItem) {
      toast.success("Successfully created user");
      router.push("/");
    } else {
      toast.success("Something went wrong");
    }
  };

  return (
    <section className="container h-screen ">
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="grid w-full max-w-lg mx-auto items-center gap-2.5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", { required: "This is required" })}
              placeholder="Name"
              type="text"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", { required: "This is required" })}
              placeholder="email"
              type="email"
            />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Password should minimum 6 character",
                minLength: 6,
              })}
              placeholder="Password"
              type="Password"
            />
            <p>{errors.password?.message}</p>
          </div>
          <Input type="submit" />
          <Button>
            Already have an account?
            <Link href="/auth/log-in" className="underline italic">
              Login
            </Link>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
