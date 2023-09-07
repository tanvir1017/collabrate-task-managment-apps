"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Select, { ActionMeta, MultiValue } from "react-select";
import { TaskPriorityLevel } from "../shadcn-ui/task-prioroty-level";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

enum StatusEnum {
  Pending = "pending",
  Complete = "complete",
  InProgress = "in-progress",
}

type Inputs = {
  topic: string;
  title: string;
  member: string;
  priority: string;
  description: string;
  status: StatusEnum; // Use the enum as the type
  teamMembers: string[];
  dueDate: Date;
};
type selectMembers = { label: string; value: string };

const AssignTasks = () => {
  const router = useRouter();
  const [priorityLevel, setpriorityLevel] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedOption, setSelectedOption] = React.useState<selectMembers[]>(
    []
  );
  const [allUsers, setAllUsers] = React.useState<selectMembers[]>([]);

  React.useEffect(() => {
    const getAllUser = localStorage.getItem("auth");

    let tempEmail: selectMembers[] = [];
    let tempMembers: string[] = [];

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

  const teamMembers = selectedOption.map((email) => email.value);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const getTeamTask = localStorage.getItem("team-tasks");
    const task = {
      ...data,
      priorityLevel,
      teamMembers: teamMembers,
      date,
      status: "pending",
    };
    if (!getTeamTask) {
      localStorage.setItem("team-tasks", JSON.stringify([task]));
      if (getTeamTask !== null) {
        const checkIsStored = JSON.parse(getTeamTask);
        toast.success("Task added success full");
        router.push("/dashboard/teams");
      }
    } else {
      const getExistData = JSON.parse(getTeamTask);
      const appendNewTask = [...getExistData, task];
      localStorage.setItem("team-tasks", JSON.stringify(appendNewTask));
      toast.success("Task added success full");
      router.push("/dashboard/teams");
    }
  };

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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </section>
  );
};

export default AssignTasks;
