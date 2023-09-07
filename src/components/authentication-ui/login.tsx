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

  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Get the value from localStorage
    const authData = localStorage.getItem("auth");

    if (authData !== null) {
      // Parse the value only if it's not null
      const getUserData = JSON.parse(authData);
      const findEmail = data.email;
      const findPassword = data.password;
      // Use map to create a new array with updated loggedIn values
      const updatedUsers = getUserData.map((user: any) => {
        if (user.email !== findEmail || user.password !== findPassword) {
          // Matched user, set loggedIn to true

          setError("Wrong credential");
          return { ...user, loggedIn: false };
        } else if (user.email === findEmail && user.password === findPassword) {
          // Matched user, set loggedIn to true
          setError("");
          return { ...user, loggedIn: true };
        }
      });

      const checkIsLoggedInUser = updatedUsers.find(
        (user: any) => user.loggedIn !== false
      );
      if (checkIsLoggedInUser) {
        // Store the updatedUsers array in localStorage
        localStorage.setItem("auth", JSON.stringify(updatedUsers));
        // Make client side more interactive with toast message
        toast.success("User logged in");
        router.push("/dashboard");
      } else {
        return;
      }
    } else {
      // Handle the case where the value is null (e.g., user is not authenticated)
      console.error("Authentication data not found in localStorage");
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="container h-screen ">
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="grid w-full max-w-lg mx-auto items-center gap-2.5">
        {error && <p className="w-full bg-red-300">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Input className="cursor-pointer inline-flex" type="submit" />
            <Button>
              Don't have any account?
              <Link href="/auth/sign-up" className="underline italic">
                Sign up
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
