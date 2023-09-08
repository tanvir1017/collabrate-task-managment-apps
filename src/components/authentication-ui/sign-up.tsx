"use client";

import { uploadImage } from "@/lib/img-uploader";
import { generateUniqueRandomNumber } from "@/lib/random-id";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Inputs } from "../../../type/global";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SignUpUi = () => {
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

  const handleOnChangeOnPicture = (event: any) => {
    const file = event.target.files[0]; // Get the selected file
    setTargetFiles(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string; // Use optional chaining
        setImagePreview(imageDataUrl); // Set the preview image URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const getItem = localStorage.getItem("auth");
    const { secure_url } = await uploadImage(targetFiles);
    const generatedId = generateUniqueRandomNumber();
    const info = {
      ...data,
      id: generatedId + data.name.trim(),
      userName: data.name + generatedId,
      loggedIn: true,
      avatar: secure_url,
    };

    if (!getItem) {
      localStorage.setItem("auth", JSON.stringify([info]));
      toast.success("Successfully created user");
      router.push("/dashboard");
    } else if (getItem) {
      const existUser = JSON.parse(getItem); // Parsing every exist user
      // After that logged out everyone
      const updatedUsers = existUser.map((user: any) => ({
        ...user,
        loggedIn: false,
      }));

      // setting with new value
      localStorage.setItem("auth", JSON.stringify([...updatedUsers, info]));

      // Make client side more interactive with toast message
      toast.success("Successfully created user");
      router.push("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="container  ">
      <Toaster position="bottom-center" reverseOrder={true} />

      <div className="grid w-full max-w-4xl h-screen place-content-center mx-auto items-center gap-2.5">
        <form onSubmit={handleSubmit(onSubmit)} className="border ">
          <h2 className="text-3xl font-bold center px-3 pt-5">
            Register a account
          </h2>
          <div className="p-16 space-y-3">
            <div className="w-[145px] h-[144px] border-2 rounded-full m-auto relative overflow-hidden">
              {imagePreview ? (
                <Image
                  className="absolute"
                  src={imagePreview}
                  alt="user-avatar"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              ) : (
                <Image
                  className="absolute"
                  src="/demo.jpg"
                  alt="user-avatar"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              )}
              <div
                className="rounded-full absolute top-[100%] hover:top-[50%] transition-all
              duration-300 opacity-0 hover:opacity-100  left-[50%] -translate-x-[50%] -translate-y-[50%]"
              >
                <Label className="absolute transition duration-200 p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full backdrop-blur-sm bg-white/5 border-2 border-white/30">
                  <Upload className="" />{" "}
                </Label>
                <Input
                  className="scale-150 p-8 opacity-0 cursor-pointer top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute"
                  required={true}
                  type="file"
                  onChange={handleOnChangeOnPicture}
                  accept="image/*"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: "This is required" })}
                placeholder="Name"
                type="text"
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: "This is required" })}
                placeholder="email"
                type="email"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
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
              {errors.password?.message && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Input className="cursor-pointer inline-flex" type="submit" />
              <Button>
                Already have an account?
                <Link href="/" className="underline italic">
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpUi;
