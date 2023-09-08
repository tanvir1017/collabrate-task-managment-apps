export type Inputs = {
  name: string;
  picture: string;
  email: string;
  password: string;
};

export enum StatusEnum {
  Pending = "pending",
  Complete = "complete",
  InProgress = "in-progress",
}

export type AssignTaskInputs = {
  topic: string;
  title: string;
  member: string;
  priority: string;
  description: string;
  status: StatusEnum; // Use the enum as the type
  teamMembers: string[];
  dueDate: Date;
};
export type selectMembers = { label: string; value: string };
export type TempTeam = { email: string; isAccept: boolean };

export type MyInvitation = {
  id: string;
  topic: string;
  title: string;
  description: string;
  priorityLevel: string;
  taskCreator: string;
  teamMembers: { email: string; isAccept: boolean }[];
  date: Date;
  status: string;
};
export type Members = {
  email: string;
  isAccept: boolean;
};

export type TeamTaskType = {
  topic: string;
  title: string;
  description: string;
  priorityLevel: string;
  teamMembers: string[];
  date: Date;
  status: string;
};

export type userDataType = {
  name: string;
  email: string;
  password: string;
  id: string;
  userName: string;
  loggedIn: boolean;
  avatar: string;
};
