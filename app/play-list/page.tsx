import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const PlayListPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">لیست پخش</h1>
        <Link href="/">
          <h3 className="text-purple-400 hover:text-white hover:bg-white/10 rounded-xl group transition-all duration-300 flex items-center py-1.5 px-3">
            بازگشت
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default PlayListPage;
