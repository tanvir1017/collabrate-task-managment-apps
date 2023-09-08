import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function UpdateStatusDropDown({
  status,
  id,
  handleUpdateTaskStatus,
}: {
  id: string;
  status: string;
  handleUpdateTaskStatus?: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
          {status}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex items-center"
            onClick={() => handleUpdateTaskStatus(id, "in-progress")}
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
            onClick={() => handleUpdateTaskStatus(id, "complete")}
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
  );
}
