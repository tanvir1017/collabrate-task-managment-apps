"use client";
import { generateUniqueRandomNumber } from "@/lib/random-id";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Select, { ActionMeta, MultiValue } from "react-select";
import {
  AssignTaskInputs,
  TempTeam,
  selectMembers,
} from "../../../type/global";
import { TaskPriorityLevel } from "../shadcn-ui/task-prioroty-level";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const AssignTasks = () => {
  // Import necessary dependencies and hooks
  const router = useRouter();
  const [priorityLevel, setpriorityLevel] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();
  const [allUsers, setAllUsers] = React.useState<selectMembers[]>([]);
  const [currentUser, setCurrentUser] = React.useState<string>("");
  const [selectedOption, setSelectedOption] = React.useState<selectMembers[]>(
    []
  );

  // UseEffect to get the current user's email when the component mounts
  React.useEffect(() => {
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

  // UseEffect to load user options from local storage
  React.useEffect(() => {
    const getAllUser = localStorage.getItem("auth");

    let tempEmail: selectMembers[] = [];

    if (getAllUser !== null) {
      const users = JSON.parse(getAllUser);
      const makingOptions = users.map((user: any) => {
        const options = {
          label: user.email,
          value: user.email,
        };
        tempEmail.push(options);
      });
      setAllUsers(tempEmail);
    }
  }, []);

  // Initialize an array to store team members' data
  let tempTeam: TempTeam[] = [];

  // Create team members from selectedOption
  const teamMembers = selectedOption.map((email) => {
    const team = {
      email: email.value,
      isAccept: false,
    };
    tempTeam.push(team);
  });

  // React-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AssignTaskInputs>();

  // Function to handle form submission
  const onSubmit: SubmitHandler<AssignTaskInputs> = (data) => {
    setLoading(true);
    const getTeamTask = localStorage.getItem("team-tasks");

    // Generate a unique task ID
    const generatedId =
      generateUniqueRandomNumber() + data.title.replace(/\s+/g, "");

    // Create a new task object with form data
    const task = {
      ...data,
      id: generatedId,
      taskCreator: currentUser,
      teamMembers: tempTeam,
      date,
      status: "pending",
    };

    if (!getTeamTask) {
      localStorage.setItem("team-tasks", JSON.stringify([task]));
      setLoading(false);
      if (getTeamTask !== null) {
        const checkIsStored = JSON.parse(getTeamTask);
        console.log(checkIsStored);
        toast.success("Task added successfully");
        router.push("/dashboard/teams");
      }
    } else {
      const getExistData = JSON.parse(getTeamTask);
      const appendNewTask = [...getExistData, task];
      localStorage.setItem("team-tasks", JSON.stringify(appendNewTask));
      setLoading(false);
      toast.success("Task added successfully");
      router.push("/dashboard/teams");
    }
  };

  // Function to handle changes in the selectedOption
  const handleChange = (
    newValue: MultiValue<selectMembers>,
    actionMeta: ActionMeta<selectMembers>
  ) => {
    // Update the selectedOption state with the newValue
    setSelectedOption(newValue as selectMembers[]); // Cast the newValue as selectMembers[]
  };

  return (
    <section>
      <Toaster position="bottom-center" reverseOrder={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3 justify-items-end">
          <div className="w-full">
            {" "}
            <Input
              {...register("topic", { required: "Topic is required" })}
              placeholder="Task topic"
            />
            {errors.topic?.message && (
              <p className="text-red-500">{errors.topic?.message}</p>
            )}
          </div>

          <Select
            placeholder="Invite team members"
            styles={{
              menuList: (baseStyles) => ({
                ...baseStyles,
                background: "#1E293B",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                background: "#020817",
                borderColor: state.isFocused ? "white" : "gray",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#020817",
                primary: "black",
              },
            })}
            className="react-select-container w-full"
            classNamePrefix="react-select"
            defaultValue={selectedOption}
            noOptionsMessage={() => "No user found"}
            onChange={handleChange}
            isMulti
            options={allUsers}
          />

          <TaskPriorityLevel
            setValue={setpriorityLevel}
            value={priorityLevel}
          />

          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="w-full mt-4">
          {" "}
          <Input
            {...register("title", { required: "Title are required" })}
            placeholder="Task Title"
          />
          {errors.title?.message && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>
        <div className="mt-5">
          <Textarea
            {...register("description", {
              required: "description are required",
            })}
            rows={20}
            placeholder="Task Description"
          />
        </div>

        <div className="flex items-center justify-end space-x-2 mt-3">
          <Link href="/dashboard/teams">
            <Button type="submit">Cancel</Button>
          </Link>
          <Button type="submit">{loading ? "Submitting..." : "Submit"}</Button>
        </div>
      </form>
    </section>
  );
};

export default AssignTasks;
