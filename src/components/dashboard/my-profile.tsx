"use client";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { userDataType } from "../../../type/global";

const MyProfile = () => {
  const [currentUser, setCurrentUser] = useState<userDataType[]>([]); // State to store the current user's email

  // useEffect to get the currently logged-in user from local storage
  useEffect(() => {
    const authInfo = localStorage.getItem("auth"); // Get authentication info from local storage

    if (authInfo !== null) {
      const parsingAuthInfo = JSON.parse(authInfo); // Parse the authentication info
      const loggedInUser = parsingAuthInfo.find(
        (user: userDataType) => user.loggedIn !== false
      ); // Find the logged-in user

      if (loggedInUser) {
        setCurrentUser([loggedInUser]); // Set the current user's email in state
      }
    }
  }, []); // Run this effect once when the component mounts

  return (
    <section className="">
      <div className="grid place-content-center border max-w-2xl h-[60dvh] mx-auto">
        {currentUser.map((user: userDataType, i: number) => (
          <div key={i} className="flex items-center">
            <div className="w-[145px] h-[144px] border-2 rounded-md m-auto relative overflow-hidden">
              {user.avatar ? (
                <Image
                  className="absolute"
                  src={user.avatar}
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
            </div>
            <div className="ml-5 space-y-3">
              <h2 className="text-2xl"> Name: {user.name}</h2>
              <p className="text-base ">User Name: {user.userName}</p>
              <p className="text-base ">Email: {user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyProfile;
