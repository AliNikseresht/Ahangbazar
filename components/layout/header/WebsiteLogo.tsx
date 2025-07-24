import Image from "next/image";
import React from "react";
import logo from "@/public/ahangbazar-logo.png";
import Link from "next/link";

const WebsiteLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={logo}
        alt="ahangbazar-logo"
        className="w-8 lg:w-10 h-auto object-contain hidden md:flex"
      />
      <h1>آهنگ بازار</h1>
    </Link>
  );
};

export default WebsiteLogo;
