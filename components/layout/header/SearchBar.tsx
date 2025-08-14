import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex items-center flex-1 max-w-xl mx-8"
    >
      <div className="relative w-full group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
        <Input
          type="text"
          placeholder="جستجوی آهنگ، هنرمند، آلبوم..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
          dir="rtl"
        />
      </div>
    </form>
  );
}
