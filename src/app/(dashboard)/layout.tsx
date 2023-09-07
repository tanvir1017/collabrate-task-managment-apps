import ActionSidebar from "@/components/dashboard/aside-action-sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="app">
      <div className="container auto relative">
        <div className="grid grid-cols-12 gap-2">
          <ActionSidebar />

          <div className="col-span-10">
            <div className="py-5 px-3">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
