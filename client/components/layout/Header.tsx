import React from "react";
import WebsiteLogo from "./header/WebsiteLogo";
import InteractiveSearchBox from "./header/InteractiveSearchBox";
import ToggleThemeButton from "./header/ToggleThemeButton";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center shadow p-3">
      <WebsiteLogo />
      <InteractiveSearchBox />
      <ToggleThemeButton />
    </div>
  );
};

export default Header;
