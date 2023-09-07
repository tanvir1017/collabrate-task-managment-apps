import { formattedDate } from "@/lib/date-formate";
import { Flag, MoreVertical } from "lucide-react";
import { Button } from "react-day-picker";

const HaveBeenAddedTasks = ({ currentTask }: any) => {
  return (
    <>
      {currentTask.length <= 0 ? (
        <div className="grid h-screen place-content-center relative">
          <div className="text-red-500">You are not added in any task</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-5">
          {currentTask.map((task: any, i: number) => {
            return (
              <div
                key={i}
                className="border-[1.5px] p-3 rounded-md dark:shadow-none shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Button className="text-xs">{task.topic}</Button>
                  <Button className=" text-xs">
                    <MoreVertical />
                  </Button>
                </div>
                <h3 className="text-base font-semibold mt-5">{task.title}</h3>
                <div className="mt-5 flex items-center justify-between">
                  <p className="flex items-center text-sm ">
                    {" "}
                    <Flag strokeWidth={1} className="mr-1 w-4 h-4" />
                    {formattedDate(task.date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HaveBeenAddedTasks;
