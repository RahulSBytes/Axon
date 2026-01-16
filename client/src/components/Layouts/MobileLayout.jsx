import React from "react";
import { Outlet } from "react-router-dom";

function MobileLayout() {
  return (
    <div className="bg-primary min-h-screen">
      {/* mobile header / bottom nav etc */}
      <Outlet />
    </div>
  );
}

export default MobileLayout;