import Image from "next/image";
import React from "react";
import logo from "@/public/ahangbazar-logo.png";

const WebsiteLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={logo}
        alt="ahangbazar-logo"
        className="w-14 h-auto object-contain"
      />
      <h1>آهنگ بازار</h1>
    </div>
  );
};

export default WebsiteLogo;
