"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const profileSideBardNavigation = [
  {
    url: "/dashboard",
    title: "Dashboard",
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
    url: "/dashboard/invitation",
    title: "Invitation",
  },
  {
    url: "/dashboard/manage",
    title: "Manage",
  },
  {
    url: "/dashboard/me",
    title: "Profile",
  },
];

const ActionSidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="w-full p-2 border-r sticky top-0 overflow-auto pt-2 col-span-2"
      style={{ height: "100dvh" }}
    >
      <div className="pr-3">
        <h1 className="text-lg mb-5">Collaborate Task</h1>
        <ul>
          {profileSideBardNavigation.map(
            (item: { url: string; title: string }, i: number) => (
              <Link href={item.url} key={i}>
                <li
                  className={cn(
                    "relative my-2 cursor-pointer rounded-lg py-1 px-2 dark:font-thin hover:bg-slate-300 dark:hover:bg-gray-800",
                    {
                      ["dark:bg-white bg-gray-800 text-white dark:text-black dark:font-semibold hover:bg-gray-900 dark:hover:bg-slate-200"]:
                        pathname === item.url,
                    }
                  )}
                >
                  {item.title}
                </li>
              </Link>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

export default ActionSidebar;
