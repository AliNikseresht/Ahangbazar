import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  return (
    <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
      <div className="relative w-full group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />

        <Input
          type="text"
          placeholder="جستجوی آهنگ، هنرمند، آلبوم..."
          value={searchQuery}
          onChange={handleChange}
          className="pl-12 pr-10 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
        />

        {searchQuery && (
          <X
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-purple-400 cursor-pointer transition-colors"
          />
        )}
      </div>
    </div>
  );
}
