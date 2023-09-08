// @ts-nocheck
"use client";
import { formattedDate } from "@/lib/date-formate";
import { Flag, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MyInvitation, TeamTaskType, userDataType } from "../../../type/global";
import { UpdateStatusDropDown } from "../shadcn-ui/update-status";
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

  const handleUpdateTaskStatus = (id: string, status: string) => {
    // Get existing data from local storage or set an empty array if not found
    const getExistDataFromLocalStorage = localStorage.getItem(
      "team-tasks" || "[]"
    );

    const parsingAllTeamTasks = JSON.parse(getExistDataFromLocalStorage);

    // Map through myAvailableTasks and update the status if the task id matches
    const filterByIdAndUpdateStatus = parsingAllTeamTasks.map(
      (task: MyInvitation) => {
        if (task.id === id) {
          return { ...task, status };
        }
        return task;
      }
    );

    const filteredTasks = filterByIdAndUpdateStatus.filter(
      (task: MyInvitation) =>
        task.teamMembers.some(
          (member: Members) =>
            member.email === currentUser && member.isAccept !== false
        )
    );

    // Update the state with the filtered and updated tasks
    setTeamTasks(filteredTasks);

    // If data exists in local storage, update it with the new task data
    if (getExistDataFromLocalStorage !== null) {
      localStorage.setItem(
        "team-tasks",
        JSON.stringify(filterByIdAndUpdateStatus)
      );
      toast.success("Status updated");
    }
  };
  return (
    <section>
      <Toaster position="top-center" reverseOrder />
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
                  {/* <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
                    {team.status}
                  </button> */}
                  <UpdateStatusDropDown
                    handleUpdateTaskStatus={handleUpdateTaskStatus}
                    id={team.id}
                    status={team.status}
                  />
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
