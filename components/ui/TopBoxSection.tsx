import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBoxSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#40ad6d] to-[#08aadb] w-full shadow h-[180px] rounded-xl p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-xl lg:text-3xl text-white">آهنگ ویژه هفته</h2>
        <p className="text-white text-xs md:text-sm lg:text-base">
          بهترین موسیقی های این هفته را از دست ندهید
        </p>
      </div>
      <Link
        href="/top-songs"
        className="font-bold text-base lg:text-xl bg-white hover:bg-gradient-to-r from-[#40ad6d0a] to-[#08aadb1a] rounded-md py-1 flex items-center w-32 lg:w-36 justify-center gap-1 hover:text-white duration-300"
      >
        <Play size={19} color="#40ad6d" />
        <span className="bg-gradient-to-b from-[#40ad6d] to-[#08aadb] bg-clip-text text-transparent">
          پخش آهنگ
        </span>
      </Link>
    </div>
  );
};

export default TopBoxSection;
