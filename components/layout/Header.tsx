import React, { useState, useEffect } from "react";
import { Logo } from "./header/Logo";
import { NavLinks } from "./header/NavLinks";
import { SearchBar } from "./header/SearchBar";
import { ActionButtons } from "./header/ActionButtons";
import { searchAll } from "@/libs/searchBar";
import MusicCard from "../MusicCard";
import { Track } from "@/types/tracksType";

export interface HeaderProps {
  onUpload?: () => void;
  onSearchResultClick?: (track: Track) => void;
}

export function Header({ onUpload, onSearchResultClick }: HeaderProps) {
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const data = await searchAll(q);
    setResults(data);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query) {
        setResults([]);
        setSearched(false);
        return;
      }
      handleSearch(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-2 py-4 flex items-center justify-between">
        <Logo />
        <NavLinks />
        <SearchBar onSearch={setQuery} />

        {(loading || searched) && (
          <div className="max-h-[250px] overflow-auto mt-6 space-y-3 absolute top-16 left-[23.3em] w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
            {loading && <div className="text-gray-400">در حال جستجو...</div>}
            {!loading && results.length === 0 && (
              <div className="text-gray-400">هیچ نتیجه‌ای یافت نشد</div>
            )}
            {!loading &&
              results.map((item) => (
                <MusicCard
                  key={item.id}
                  track={{
                    id: item.id,
                    title: item.title,
                    artist: item.artist || "ناشناس",
                    cover: item.cover,
                    duration: item.duration,
                    plays: item.plays,
                    favorites: item.favorites || 0,
                    audio: item.audio,
                  }}
                  variant="list"
                  onPlay={() => onSearchResultClick?.(item)}
                />
              ))}
          </div>
        )}

        <ActionButtons onUpload={onUpload} />
      </div>
    </header>
  );
}
