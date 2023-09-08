"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Select from "react-select";
export function AssignUserToTask({
  selectedOption,
  handleChange,
  allUsers,
  id,
  handleAddTeamMembers,
}: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Users className="w-4 h-4 mr-2" />
          Assign User
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assign users to your task</AlertDialogTitle>
          <AlertDialogDescription>
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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleAddTeamMembers(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
