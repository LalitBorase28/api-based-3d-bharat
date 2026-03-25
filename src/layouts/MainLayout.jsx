import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-indigo-100/35">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar stays at the top of the content area */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto py-5 px-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
