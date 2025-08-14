import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  return (
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
        align="start"
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
  );
}
