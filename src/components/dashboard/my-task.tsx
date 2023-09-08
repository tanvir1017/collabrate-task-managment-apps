"use client";

import { formattedDate } from "@/lib/date-formate";
import { Flag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Members, MyInvitation } from "../../../type/global";
import { StatusLevel } from "../shadcn-ui/status-level";
import { TaskPriorityLevel } from "../shadcn-ui/task-prioroty-level";
import { DatePicker } from "../ui/date-picker";
import UserCreatedTask from "./user-created-task";

const MyTask = () => {
  const [priorityLevel, setpriorityLevel] = useState<string>("");
  const [statusLevel, setStatusLevel] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentUser, setCurrentUser] = useState<string>("");
  const [assignedTeamTasksAvailable, setAssignedTeamTasksAvailable] = useState(
    []
  );
  const [myAvailableTasks, setMyAvailableTasks] = useState([]);

  useEffect(() => {
    const authInfo = localStorage.getItem("auth");
    if (authInfo !== null) {
      const parsingAuthInfo = JSON.parse(authInfo);
      const loggedInUser = parsingAuthInfo.find(
        (user: any) => user.loggedIn !== false
      );
      if (loggedInUser) {
        setCurrentUser(loggedInUser.email);
      }
    }
  }, []); // Run once when the component mounts

  useEffect(() => {
    const myCreatedTask = localStorage.getItem("tasks");
    if (myCreatedTask !== null && currentUser.length > 0) {
      const myTasksAre = JSON.parse(myCreatedTask);
      const myTasks = myTasksAre.filter(
        (task: any) => task.taskCreator === currentUser
      );

      setMyAvailableTasks(myTasks);
    }
  }, [currentUser]); // Run whenever currentUser changes

  useEffect(() => {
    const assignedTeamTasks = localStorage.getItem("team-tasks");
    if (assignedTeamTasks !== null && currentUser.length > 0) {
      const teamTasks = JSON.parse(assignedTeamTasks);
      const filteredTasks = teamTasks.filter((task: MyInvitation) =>
        task.teamMembers.some(
          (member: Members) =>
            member.email === currentUser && member.isAccept !== false
        )
      );

      setAssignedTeamTasksAvailable(filteredTasks);
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
          <div className="mt-5">
            <h4 className="font-semibold text-base mb-3">Filter By</h4>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <StatusLevel setValue={setStatusLevel} value={statusLevel} />
              <TaskPriorityLevel
                setValue={setpriorityLevel}
                value={priorityLevel}
              />
            </div>
            <div className="flex justify-center">
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <UserCreatedTask
            myAvailableTasks={myAvailableTasks}
            date={date}
            statusLevel={statusLevel}
            priorityLevel={priorityLevel}
          />
        </div>

        <div className="p-2">
          <h4 className="font-semibold">Attached with team</h4>
          <p>
            This section will show where i'am attached and only accepted task
            will show
          </p>
          {assignedTeamTasksAvailable.length <= 0 ? (
            <div className="grid h-screen place-content-center relative">
              <div className="text-red-500">You are not added in any task</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 mt-5">
              {assignedTeamTasksAvailable.map((task: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="border-[1.5px] p-3 rounded-md dark:shadow-none shadow-lg mt-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <button className="px-4 py-0.5 border rounded-full bg-gradient-to-tr from-cyan-500 to-green-400 text-black">
                          {task.topic}
                        </button>
                        <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
                          {task.status}
                        </button>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold mt-5">
                      {task.title}
                    </h3>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="flex items-center text-sm ">
                        <Flag strokeWidth={1} className="mr-1 w-4 h-4" />
                        {formattedDate(task.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
