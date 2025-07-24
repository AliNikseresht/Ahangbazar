import React from "react";
import WebsiteLogo from "./header/WebsiteLogo";
import InteractiveSearchBox from "./header/InteractiveSearchBox";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center shadow p-1.5 lg:p-3">
      <WebsiteLogo />
      <InteractiveSearchBox />
    </div>
  );
};

export default Header;
