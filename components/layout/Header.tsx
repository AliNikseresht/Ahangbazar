import React, { useState } from "react";
import {
  Search,
  Menu,
  Upload,
  User,
  Sun,
  Moon,
  Music4,
  Bell,
  Settings,
} from "lucide-react";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onUpload?: () => void;
}

export function Header({ onSearch, onUpload }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Music4 className="text-white w-7 h-7" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SoundWave
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                Premium Music Platform
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#"
              className="text-white hover:text-purple-400 transition-all duration-300 relative group"
            >
              <span>خانه</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              <span>کشف</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              <span>پلی‌لیست</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              <span>هنرمندان</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xl mx-8"
          >
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
              <Input
                type="text"
                placeholder="جستجوی اهنگ، هنرمند، آلبوم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                dir="rtl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Upload Button */}
            <Button
              onClick={onUpload}
              className="hidden lg:flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-3 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Upload className="w-4 h-4 ml-2" />
              آپلود
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-purple-400/30 ring-offset-2 ring-offset-transparent">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      K
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
                align="end"
              >
                <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  پروفایل من
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl transition-colors">
                  موزیک‌های من
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl transition-colors">
                  پلی‌لیست‌های من
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white hover:bg-white/10 rounded-xl transition-colors">
                  تنظیمات
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/20 rounded-xl transition-colors">
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
