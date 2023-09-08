"use client";

import { formattedDate } from "@/lib/date-formate";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { Members, MyInvitation } from "../../../type/global";
import { AcceptInvitation } from "../shadcn-ui/accept-invitation";

const Invitation = () => {
  // State to store invitations
  const [myInvitation, setMyInvitation] = useState<MyInvitation[]>([]);

  // State to store the current user's email
  const [currentUser, setCurrentUser] = useState<string>("");

  // UseEffect to get the current user's email when the component mounts
  useEffect(() => {
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

  // UseEffect to get pending invitations for the current user
  useEffect(() => {
    const myInvitation = localStorage.getItem("team-tasks");
    if (myInvitation !== null && currentUser.length > 0) {
      const myTasksAre = JSON.parse(myInvitation);
      const filteredTasks = myTasksAre.filter((task: MyInvitation) =>
        task.teamMembers.some(
          (member: Members) =>
            member.email === currentUser && member.isAccept === false
        )
      );
      setMyInvitation(filteredTasks);
    }
  }, [currentUser]); // Run whenever currentUser changes

  // Function to handle accepting an invitation
  const handleAcceptInvitation = (id: string, email: string) => {
    // Retrieve existing data from localStorage
    const myInvitationFromLocalStore = JSON.parse(
      localStorage.getItem("team-tasks") || "[]"
    );
    const updatedTasks = myInvitation.map((task) => {
      if (task.id === id) {
        // Clone the task and update isAccept to true
        return {
          ...task,
          teamMembers: task.teamMembers.map((member) => {
            if (member.email === currentUser) {
              return { ...member, isAccept: true };
            }
            return member;
          }),
        };
      }
      // If the id doesn't match, keep the task as it is
      return task;
    });

    setMyInvitation(updatedTasks);

    // Updating the relevant data within the retrieved array
    const updatedData = myInvitationFromLocalStore.map((item: MyInvitation) => {
      const matchingTask = updatedTasks.find((task) => task.id === item.id);
      if (matchingTask) {
        return matchingTask; // Replace existing data with updated data
      }
      return item; // Keep other data as it is
    });

    // Setting the updated data back to localStorage
    localStorage.setItem("team-tasks", JSON.stringify(updatedData));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {myInvitation.length <= 0 ? (
          <div className="grid place-content-center text-red-400">
            <p>You haven't any invitation Or You may logged Out</p>
          </div>
        ) : (
          myInvitation.map((invitation: MyInvitation, i: number) => {
            return (
              <div
                key={i}
                className="border-[1.5px] p-3 rounded-md dark:shadow-none shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <button className="px-4 py-0.5 border rounded-full bg-gradient-to-tr from-cyan-500 to-green-400 text-black">
                      {invitation.topic}
                    </button>
                    <button className="ml-3 px-4 py-0.5 border rounded-full bg-pink-600">
                      {invitation.status}
                    </button>
                    <button
                      className={cn(
                        "ml-3 px-4 py-0.5 border rounded-full bg-blue-500",
                        {
                          ["bg-orange-500"]:
                            invitation?.priorityLevel === "medium",
                          ["bg-red-500"]: invitation?.priorityLevel === "high",
                        }
                      )}
                    >
                      {invitation.priorityLevel
                        ? invitation.priorityLevel
                        : "low"}
                    </button>
                  </div>
                  <AcceptInvitation
                    handleAcceptInvitation={handleAcceptInvitation}
                    email={currentUser}
                    id={invitation.id}
                  />
                </div>
                <h3 className="text-base font-semibold mt-5">
                  {invitation.title}
                </h3>
                <p className="text-sm mt-5">
                  You are invited by{" "}
                  <span className="italic underline tracking-wider">
                    {invitation.taskCreator}
                  </span>
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="flex items-center text-sm ">
                    <Flag strokeWidth={1} className="mr-1 w-4 h-4" />
                    {formattedDate(invitation.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Invitation;
