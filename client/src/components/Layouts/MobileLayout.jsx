import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Mobnav from "./Mobnav";

function MobileLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <div className="bg-secondary flex-col h-screen flex overflow-hidden">
      <Mobnav nav={{isNavOpen, setIsNavOpen}} />
      <div className=" flex-1 overflow-hidden  w-full">
      <Outlet context={isNavOpen} />
      </div>
    </div>
  );
}

export default MobileLayout;