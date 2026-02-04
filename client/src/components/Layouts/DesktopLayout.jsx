import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function DesktopLayout() {
  return (
    <div className="bg-primary h-screen flex p-4 pl-0 overflow-hidden">
      
      <Sidebar />

      <div className='bg-secondary rounded-md flex flex-1 relative flex-col items-center overflow-hidden min-w-0'>
        <Outlet />
      </div>
    </div>
  );
}

export default DesktopLayout;