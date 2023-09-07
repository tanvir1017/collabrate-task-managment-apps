"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { TaskPriorityLevel } from "../shadcn-ui/task-prioroty-level";
import { userDataType } from "../shadcn-ui/users-combox";
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
  taskCreator: string;
  teamMembers: string[];
  dueDate: Date;
};

const CreateTask = () => {
  const router = useRouter();
  const [priorityLevel, setpriorityLevel] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [currentUser, setCurrentUser] = React.useState<userDataType[]>([]);

  React.useEffect(() => {
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const getTask = localStorage.getItem("tasks");
    const task = {
      ...data,
      priorityLevel,
      taskCreator: currentUser[0]?.email,
      teamMembers: [],
      date,
      status: "pending",
    };
    if (!getTask) {
      localStorage.setItem("tasks", JSON.stringify([task]));
      if (getTask !== null) {
        const checkIsStored = JSON.parse(getTask);
        toast.success("Task added success full");
        router.push("/dashboard/tasks");
        console.log(JSON.parse(getTask));
      }
    } else {
      const getExistData = JSON.parse(getTask);
      const appendNewTask = [...getExistData, task];
      localStorage.setItem("tasks", JSON.stringify(appendNewTask));
      toast.success("Task added success full");
      router.push("/dashboard/tasks");
      console.log(JSON.parse(getTask));
    }
  };

  return (
    <section>
      <Toaster position="bottom-center" reverseOrder={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3 justify-items-end">
          <div className="w-full">
            {" "}
            <Input
              {...register("title", { required: "Title are required" })}
              placeholder="Task Title"
            />
            {errors.title?.message && (
              <p className="text-red-500">{errors.title?.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              {...register("topic", { required: "Topic is required" })}
              placeholder="Task topic"
            />
            {errors.topic?.message && (
              <p className="text-red-500">{errors.topic?.message}</p>
            )}
          </div>

          <TaskPriorityLevel
            setValue={setpriorityLevel}
            value={priorityLevel}
          />

          <DatePicker date={date} setDate={setDate} />
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
          <Link href="/dashboard/tasks">
            <Button type="submit">Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </section>
  );
};

export default CreateTask;
