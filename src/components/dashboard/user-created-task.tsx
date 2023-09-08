import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formattedDate } from "@/lib/date-formate";
import { cn } from "@/lib/utils";
import { Check, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TeamTaskType } from "../../../type/global";
import { ManageDropDown } from "../shadcn-ui/manage-drop-down";
import { UpdateStatusDropDown } from "../shadcn-ui/update-status";

const UserCreatedTask = ({
  myAvailableTasks,
  statusLevel,
  priorityLevel,
  date,
}: any) => {
  const [num, setNum] = useState(0);
  const [myAvailableAndUpdatedTasks, setMyAvailableAndUpdatedTasks] =
    useState<TeamTaskType[]>(myAvailableTasks);

  useEffect(() => {
    if (statusLevel !== "") {
      const filterViaStatus = myAvailableTasks.filter(
        (task: TeamTaskType) => task.status === statusLevel
      );
    }
  }, []);

  const handleUpdateTaskStatus = (id: string, status: string) => {
    // console.log(id, status);
    const getExistDataFromLocalStorage = localStorage.getItem("tasks" || "[]");
    const filterByIdAndUpdateStatus = myAvailableTasks.map(
      (task: TeamTaskType) => {
        if (task.id === id) {
          return { ...task, status };
        }
        return task;
      }
    );
    setNum((prev) => prev + 1);
    setMyAvailableAndUpdatedTasks(filterByIdAndUpdateStatus);
    if (getExistDataFromLocalStorage !== null) {
      localStorage.setItem("tasks", JSON.stringify(filterByIdAndUpdateStatus));
      toast.success("Status updated");
    }
  };
  let tasksToShow =
    myAvailableAndUpdatedTasks.length <= 0
      ? myAvailableTasks
      : myAvailableAndUpdatedTasks;
  return (
    <div className="">
      <Toaster position="top-left" reverseOrder />
      {tasksToShow.length <= 0 ? (
        <div className="grid h-screen place-content-center relative">
          <div className="text-red-500">You are not added in any task</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5 gap-2">
          {tasksToShow.map((task: TeamTaskType, i: number) => {
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

                    <div className="inline">
                      <DropdownMenu>
                        {/* <DropdownMenuTrigger asChild></DropdownMenuTrigger> */}
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTaskStatus(task.id, "pending")
                              }
                            >
                              <Check
                                className={cn("w-4 h-4 mr-2 text-white", {
                                  ["block"]: status === "pending",
                                  ["hidden"]: status !== "pending",
                                })}
                              />{" "}
                              <span>Pending</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center"
                              onClick={() =>
                                handleUpdateTaskStatus(task.id, "in-progress")
                              }
                            >
                              <Check
                                className={cn("w-4 h-4 mr-2 text-white", {
                                  ["block"]: status === "in-progress",
                                  ["hidden"]: status !== "in-progress",
                                })}
                              />{" "}
                              <span>In-Progress</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateTaskStatus(task.id, "complete")
                              }
                            >
                              <Check
                                className={cn("w-4 h-4 mr-2 text-white", {
                                  ["block"]: status === "complete",
                                  ["hidden"]: status !== "complete",
                                })}
                              />{" "}
                              <span>Completed</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <UpdateStatusDropDown
                      handleUpdateTaskStatus={handleUpdateTaskStatus}
                      id={task.id}
                      status={task.status}
                    />
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
