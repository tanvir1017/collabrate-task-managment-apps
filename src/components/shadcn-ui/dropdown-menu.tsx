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
import { useState } from "react";

export function UserDropDown() {
  const [authInfo, setAuthInfo] = useState([]);

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
  console.log(authInfo);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {authInfo.loggedIn ? (
          <Button
            variant="outline"
            className="w-10 h-10 relative overflow-clip rounded-full"
          >
            {authInfo.avatar ? (
              <span>
                <Image
                  src={authInfo.avatar}
                  alt={authInfo.name}
                  layout="fill"
                  objectFit="cover"
                  className="absolute"
                />
              </span>
            ) : (
              <Button>CN</Button>
            )}
          </Button>
        ) : (
          <Button variant="outline" className="p-2 rounded-full">
            <User />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {authInfo.name && (
          <DropdownMenuLabel>{authInfo.name}</DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />

        {authInfo.loggedIn ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleLoggedOut()}
          >
            Log out
          </DropdownMenuItem>
        ) : (
          <Link href="/auth/log-in" className="block">
            <DropdownMenuItem className="cursor-pointer">
              Log in
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
