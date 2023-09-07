"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const profileSideBardNavigation = [
  {
    url: "/dashboard",
    title: "Home",
  },
  {
    url: "/dashboard/tasks",
    title: "Tasks",
  },
  {
    url: "/dashboard/teams",
    title: "Teams",
  },
  {
    url: "/dashboard/assign-tasks",
    title: "Assign Task",
  },

  {
    url: "/dashboard/manage",
    title: "Manage",
  },
];

const ActionSidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="w-full p-2 border-r sticky top-0 overflow-auto"
      style={{ height: "100dvh" }}
    >
      <div className="pr-3">
        <h1 className="text-lg mb-5">Manage My Profile</h1>
        <ul>
          {profileSideBardNavigation.map((item: any, i: number) => (
            <Link href={item.url} key={i}>
              <li
                className={`relative font-medium  my-2 cursor-pointer  rounded-lg py-1 px-2 w-full ${
                  item.url === pathname
                    ? "dark:bg-[#020817] dark:text-white "
                    : "dark:text-white text-black"
                }`}
              >
                <span className="text-base font-thin">{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ActionSidebar;
