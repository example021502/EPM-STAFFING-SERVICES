import React from "react";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import { Outlet } from "react-router-dom";

function Signing() {
  return (
    <main className="h-dvh w-full overflow-y-hidden bg-b_white space-y-2 flex flex-col items-center justify-start ">
      <TopHeader />
      <Outlet />
    </main>
  );
}

export default Signing;
