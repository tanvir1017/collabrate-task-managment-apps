// @ts-nocheck
"use client";
import { formattedDate } from "@/lib/date-formate";
import { Flag, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MyInvitation, TeamTaskType, userDataType } from "../../../type/global";
import { Button } from "../ui/button";

const TeamTask = () => {
  const [teamTasks, setTeamTasks] = useState<TeamTaskType[]>([]); // State to store team tasks
  const [allUserFromStorage, setAllUserFromStorage] = useState<userDataType[]>(
    []
  ); // State to store all users from local storage
  const [currentUser, setCurrentUser] = useState<string>(""); // State to store the current user's email

  // useEffect to get the currently logged-in user from local storage
  useEffect(() => {
    const authInfo = localStorage.getItem("auth"); // Get authentication info from local storage

    if (authInfo !== null) {
      const parsingAuthInfo = JSON.parse(authInfo); // Parse the authentication info
      const loggedInUser = parsingAuthInfo.find(
        (user: any) => user.loggedIn !== false
      ); // Find the logged-in user

      if (loggedInUser) {
        setCurrentUser(loggedInUser.email); // Set the current user's email in state
      }
    }
  }, []); // Run this effect once when the component mounts

  // useEffect to get team task items and user data from local storage
  useEffect(() => {
    const getTeamTaskItems = localStorage.getItem("team-tasks"); // Get team task items from local storage
    const getUsers = localStorage.getItem("auth"); // Get user data from local storage

    if (getTeamTaskItems !== null && getUsers !== null) {
      const tasks = JSON.parse(getTeamTaskItems); // Parse team task items
      setAllUserFromStorage(JSON.parse(getUsers)); // Parse and set user data from local storage

      const filteredTasks = tasks.filter((task: MyInvitation) =>
        task.teamMembers.some(
          (member: Members) =>
            member.email === currentUser && member.isAccept !== false
        )
      );

      setTeamTasks(filteredTasks); // Set team tasks in state
    } else {
      setTeamTasks([]); // If no data found, set an empty array for team tasks
    }
  }, [currentUser]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="">TEAM TASK</h1>
        </div>
        {currentUser ? (
          <Link
            href="/dashboard/assign-tasks"
            className="italic text-sm underline"
          >
            Create a team task
          </Link>
        ) : (
          <Link href="/" className="italic text-sm underline">
            Login
          </Link>
        )}
      </div>
      {teamTasks?.length <= 0 ? (
        <div> There is no team task available</div>
      ) : (
        <div className="grid grid-cols-3 gap-3 mt-5">
          {teamTasks?.map((team: TeamTaskType, i: number) => (
            <div
              key={i}
              className="border-[1.5px] p-3 rounded-md dark:shadow-none shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <button className="px-4 py-0.5 border rounded-full bg-gradient-to-tr from-cyan-500 to-green-400 text-black">
                    {team.topic}
                  </button>
                  <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
                    {team.status}
                  </button>
                </div>
                <Button variant="outline" className=" text-xs">
                  <MoreVertical />
                </Button>
              </div>
              <h3 className="text-base font-semibold mt-5">{team.title}</h3>
              <div className="mt-5 flex items-center justify-between">
                <p className="flex items-center text-sm ">
                  {" "}
                  <Flag strokeWidth={1} className="mr-1 w-4 h-4" />
                  {formattedDate(team.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeamTask;
