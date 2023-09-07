"use client";

import { formattedDate } from "@/lib/date-formate";
import { Flag, MoreVertical } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type TeamTaskType = {
  topic: string;
  title: string;
  description: string;
  priorityLevel: string;
  teamMembers: string[];
  date: Date;
  status: string;
};

const TeamTask = () => {
  const [teamTasks, setTeamTasks] = useState<TeamTaskType[]>([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getTeamTaskItems = localStorage.getItem("team-tasks");
    const getUsers = localStorage.getItem("auth");

    if (getTeamTaskItems !== null && getUsers !== null) {
      const tasks = JSON.parse(getTeamTaskItems);
      const users = JSON.parse(getUsers);
      tasks.map((task: any) => {
        const filteredUsers = users.filter((user: any) =>
          task?.teamMembers?.includes(user.email)
        );
        setMembers(filteredUsers);
      });

      setTeamTasks(tasks);
    } else {
      setTeamTasks([]);
    }
  }, []);
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="">TEAM TASK</h1>
        <Link
          href="/dashboard/assign-tasks"
          className="italic text-sm underline"
        >
          Create a team task
        </Link>
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
                <Button variant="outline" className="text-xs">
                  {team.topic}
                </Button>
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
                  {/* {team.date ? format(team.date, "PPP") : "invalid time"} */}
                </p>

                <div className="flex -space-x-2">
                  {members.map((member: any, i: number) => (
                    <div
                      key={i}
                      className="w-8 h-8 relative rounded-full overflow-clip ring-2 ring-white"
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                        className="absolute rounded-full"
                      />
                    </div>
                  ))}
                  {/* <Image
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={user.avatarUrl}
                    alt={user.handle}
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TeamTask;
