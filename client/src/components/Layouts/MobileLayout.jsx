import { useState } from "react";
import { Outlet } from "react-router-dom";

function MobileLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false)


  return (
    <div className="bg-secondary flex-col h-screen flex overflow-hidden">
     
      <div className=" flex-1 overflow-hidden  w-full">
        <Outlet context={isNavOpen} />
      </div>
    </div>
  );
}

export default MobileLayout;