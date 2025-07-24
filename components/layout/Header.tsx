import React from "react";
import InteractiveSearchBox from "./header/InteractiveSearchBox";
import Navbar from "./header/Navbar";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center shadow p-1.5 md:p-3">
      <div className="order-2 md:order-2 md:block hidden">
        <Navbar />
      </div>
      <div className="order-3 md:order-3 block md:hidden">
        <InteractiveSearchBox />
      </div>

      <div className="w-60 lg:max-w-md lg:w-full order-4 md:order-4 hidden md:block">
        <InteractiveSearchBox />
      </div>
      <div className="order-1 md:order-1 block md:hidden">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
