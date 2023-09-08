"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { userDataType } from "../../../type/global";

export function UsersComBobox({ value, setValue }: any) {
  const [open, setOpen] = React.useState(false);

  const [searchEmail, setSearchEmail] = React.useState<string>("");
  const [allUsers, setAllUsers] = React.useState([]);
  React.useEffect(() => {
    const getAllUser = localStorage.getItem("auth");
    if (getAllUser !== null) {
      const users = JSON.parse(getAllUser);
      if (!searchEmail) {
        setAllUsers(users);
      } else {
        setAllUsers(users);
      }
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Add member"}
          {/* {console.log()} */}

          {/* {value
            ? allUsers.find((user: userDataType) => user.email === value)
            : "Add Team Member"} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[322px] p-0">
        <Command>
          <CommandInput
            onChangeCapture={(e: any) => setSearchEmail(e.target?.value)}
            placeholder="Search user..."
          />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {allUsers.map((user: userDataType) => (
              <CommandItem
                key={user.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.email ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.email}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
