"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { userDataType } from "../shadcn-ui/users-combox";
import HaveBeenAddedTasks from "./have-been-added-task";
import UserCreatedTask from "./user-created-task";

const MyTask = () => {
  const [currentUser, setCurrentUser] = useState<userDataType[]>([]);
  const [currentTask, setCurrentTask] = useState([]);

  useEffect(() => {
    const authInfo = localStorage.getItem("auth");
    if (authInfo !== null) {
      const parsingAuthInfo = JSON.parse(authInfo);
      const loggedInUser = parsingAuthInfo.find(
        (user: any) => user.loggedIn !== false
      );

      if (loggedInUser) {
        setCurrentUser([loggedInUser]);
      }
    }
  }, []); // Run once when the component mounts

  useEffect(() => {
    const assignedTeamTasks = localStorage.getItem("team-tasks");
    if (assignedTeamTasks !== null && currentUser.length > 0) {
      const teamTasks = JSON.parse(assignedTeamTasks);

      const myTasks = teamTasks.filter((task: any) =>
        task.teamMembers.includes(currentUser[0]?.email)
      );

      setCurrentTask(myTasks);
    }
  }, [currentUser]); // Run whenever currentUser changes

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold uppercase">MY Task</h1>
          <p>
            This page will show only those tasks that you have been added to
          </p>
        </div>
        <Link href="/dashboard/create-task" className="italic underline">
          {" "}
          Create Task{" "}
        </Link>
      </div>

      <div className="grid grid-cols-2 border mt-4 h-screen">
        <div className="border-r p-2">
          <h4 className="font-semibold">Where I'm the author</h4>
          <UserCreatedTask />
        </div>

        <div className="p-2">
          <h4 className="font-semibold">Have been added</h4>
          <HaveBeenAddedTasks currentTask={currentTask} />
        </div>
      </div>
    </div>
  );
};

export default MyTask;
