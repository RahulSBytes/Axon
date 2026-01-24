import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopicPopUp from "../minicomponents/TopicPopUp";

function DesktopLayout() {
  return (
    <div className="bg-primary h-screen flex p-4 pl-0">
      
      <Sidebar />

      <div className='bg-secondary rounded-md flex flex-1 relative  flex-col items-center'>
        <Outlet />
      </div>
    </div>
  );
}

export default DesktopLayout;