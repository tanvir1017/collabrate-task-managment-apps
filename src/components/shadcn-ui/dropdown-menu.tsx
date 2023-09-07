// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserDropDown() {
  const [authInfo, setAuthInfo] = useState([]);

  const router = useRouter();
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const userInfoRetrieve = JSON.parse(localStorage.getItem("auth"));
    if (userInfoRetrieve) {
      userInfoRetrieve
        .filter((user) => user.loggedIn !== false)
        .map((authUser) => setAuthInfo(authUser));
    } else {
      router.replace("/");
    }
  }, []);

  // Update localStorage when needed
  const handleLoggedOut = () => {
    const allUser = JSON.parse(localStorage.getItem("auth"));
    const loggedUser = allUser.filter((user) => user.id === authInfo.id);
    if (loggedUser) {
      const updatedUsers = allUser.map((user: any) => ({
        ...user,
        loggedIn: false,
      }));
      localStorage.setItem("auth", JSON.stringify(updatedUsers));
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {authInfo.loggedIn ? (
          <Button
            variant="outline"
            className="w-10 h-10 relative overflow-clip rounded-full"
          >
            <span>
              <Image
                src={authInfo.avatar}
                alt={authInfo.name}
                layout="fill"
                objectFit="cover"
                className="absolute"
              />
            </span>
          </Button>
        ) : (
          <Button variant="outline" className="p-2 rounded-full">
            <User />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {authInfo ? authInfo.name : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {authInfo.loggedIn ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleLoggedOut()}
          >
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/">Log in</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
