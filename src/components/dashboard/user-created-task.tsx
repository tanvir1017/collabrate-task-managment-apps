import { formattedDate } from "@/lib/date-formate";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { ManageDropDown } from "../shadcn-ui/manage-drop-down";

const UserCreatedTask = ({
  myAvailableTasks,
  statusLevel,
  priorityLevel,
  date,
}: any) => {
  const [dataForShow, setDataForShow] = useState("");

  useEffect(() => {
    if (statusLevel !== "") {
      const filterViaStatus = myAvailableTasks.filter(
        (task: any) => task.status === statusLevel
      );
    }
  }, [dataForShow]);

  return (
    <div className="">
      {myAvailableTasks.length <= 0 ? (
        <div className="grid h-screen place-content-center relative">
          <div className="text-red-500">You are not added in any task</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 gap-2">
          {myAvailableTasks.map((task: any, i: number) => {
            return (
              <div
                key={i}
                className="border-[1.5px] p-3 rounded-md dark:shadow-none shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <button className="px-4 py-0.5 border rounded-full bg-gradient-to-tr from-cyan-500 to-green-400 text-black">
                      {task.topic}
                    </button>
                    <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
                      {task.status}
                    </button>
                    <button
                      className={cn("ml-3 px-4 py-0.5 border rounded-full", {
                        ["bg-orange-500"]: task?.priorityLevel === "medium",
                        ["bg-red-500"]: task?.priorityLevel === "high",
                        ["bg-blue-500"]: task?.priorityLevel === "low",
                      })}
                    >
                      {task.priorityLevel}
                    </button>
                  </div>
                  <ManageDropDown />
                </div>
                <h3 className="text-base font-semibold mt-5">{task.title}</h3>
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
  );
};

export default UserCreatedTask;
