// @ts-nocheck
import { formattedDate } from "@/lib/date-formate";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ActionMeta, MultiValue } from "react-select";
import {
  TeamTaskType,
  selectMembers,
  userDataType,
} from "../../../type/global";
import { ManageDropDown } from "../shadcn-ui/manage-drop-down";
import { UpdateStatusDropDown } from "../shadcn-ui/update-status";
import ShowAvatar from "./show-avatar";

const UserCreatedTask = ({
  myAvailableTasks,
  statusLevel,
  priorityLevel,
  date,
  currentUser,
}: any) => {
  const [myAvailableAndUpdatedTasks, setMyAvailableAndUpdatedTasks] =
    useState<TeamTaskType[]>(myAvailableTasks); // State for available and updated tasks
  const [selectedOption, setSelectedOption] = useState<selectMembers[]>([]); // State for selected options (team members)
  const [allUsers, setAllUsers] = useState<selectMembers[]>([]); // State for all users (options)
  const [allUsersFromStorage, setAllUsersFromStorage] = useState<
    userDataType[]
  >([]); // State for all users from local storage

  const handleUpdateTaskStatus = (id: string, status: string) => {
    // Get existing data from local storage or set an empty array if not found
    const getExistDataFromLocalStorage = localStorage.getItem("tasks" || "[]");

    // Map through myAvailableTasks and update the status if the task id matches
    const filterByIdAndUpdateStatus = myAvailableTasks.map(
      (task: TeamTaskType) => {
        if (task.id === id) {
          return { ...task, status };
        }
        return task;
      }
    );

    // Update the state with the filtered and updated tasks
    setMyAvailableAndUpdatedTasks(filterByIdAndUpdateStatus);

    // If data exists in local storage, update it with the new task data
    if (getExistDataFromLocalStorage !== null) {
      localStorage.setItem("tasks", JSON.stringify(filterByIdAndUpdateStatus));
      toast.success("Status updated");
    }
  };

  useEffect(() => {
    // Get all users from local storage
    const getAllUser = localStorage.getItem("auth");

    if (getAllUser !== null) {
      // Parse and set all users from local storage
      const everyUserExistOnStorage = JSON.parse(getAllUser);
      setAllUsersFromStorage(everyUserExistOnStorage);
    }

    let tempEmail: selectMembers[] = [];
    if (getAllUser !== null) {
      const users = JSON.parse(getAllUser);

      // Create select options from user emails and set them in state
      const makingOptions = users.map((user: any) => {
        const options = {
          label: user.email,
          value: user.email,
        };
        tempEmail.push(options);
      });
      setAllUsers(tempEmail);
    }
  }, [currentUser]);

  const handleAddTeamMembers = (id: string) => {
    // Get existing data from local storage or set an empty array if not found
    const getExistDataFromLocalStorage = localStorage.getItem("tasks" || "[]");

    // Map through selectedOption and get the email values
    const findOnlyMail = selectedOption.map(
      (mail: selectMembers) => mail.value
    );

    // Convert the email array to a comma-separated string
    const convertingEMailsArrayToString = findOnlyMail.join(", ");

    // If data exists in local storage, update it with the new team members
    if (getExistDataFromLocalStorage !== null) {
      const takAllTasksData = JSON.parse(getExistDataFromLocalStorage);

      // Map through tasks and update team members if the task id matches
      const filterByIdAndUpdateTeamMembers = takAllTasksData.map(
        (task: TeamTaskType) => {
          if (task.id === id) {
            return {
              ...task,
              teamMembers: [...task.teamMembers, convertingEMailsArrayToString],
            };
          }
          return task;
        }
      );

      // Filter and set the updated data based on the task creator
      const setFilteredData = filterByIdAndUpdateTeamMembers.filter(
        (task: TeamTaskType) => task.taskCreator === currentUser
      );

      // Update the state with the filtered and updated tasks
      setMyAvailableAndUpdatedTasks(setFilteredData);

      // Update the local storage with the new task data
      localStorage.setItem(
        "tasks",
        JSON.stringify(filterByIdAndUpdateTeamMembers)
      );
      toast.success(`${findOnlyMail.length} Team Member added`);
    }
  };

  const handleChange = (
    newValue: MultiValue<selectMembers>,
    actionMeta: ActionMeta<selectMembers>
  ) => {
    // Update the selectedOption state with the newValue
    setSelectedOption(newValue as selectMembers[]); // Cast the newValue as selectMembers[]
  };

  // Determine which set of tasks to display
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
          {" "}
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
                  <ManageDropDown
                    id={task.id}
                    setSelectedOption={setSelectedOption}
                    handleChange={handleChange}
                    allUsers={allUsers}
                    handleAddTeamMembers={handleAddTeamMembers}
                  />
                </div>
                <h3 className="text-base font-semibold mt-5">{task.title}</h3>
                <div className="mt-5 flex items-center justify-between">
                  <p className="flex items-center text-sm ">
                    <Flag strokeWidth={1} className="mr-1 w-4 h-4" />
                    {formattedDate(task.date)}
                  </p>
                </div>

                <div className="my-3">
                  <ShowAvatar
                    members={task.teamMembers}
                    registeredUser={allUsersFromStorage}
                  />
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
