import { Music4 } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
          <Music4 className="text-white w-7 h-7" />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse"></div>
      </div>
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          آهنگ بازار
        </h1>
      </div>
    </div>
  );
}
