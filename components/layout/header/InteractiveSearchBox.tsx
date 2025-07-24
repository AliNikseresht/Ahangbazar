"use client";

import { useState, useEffect } from "react";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

const dummySongs: Song[] = [
  { id: 1, title: "بی‌تو", artist: "محسن یگانه", album: "نفس‌های بی‌تو" },
  { id: 2, title: "چشمای تو", artist: "محسن چاوشی", album: "سنتوری" },
  { id: 3, title: "عاشق شدم", artist: "مجید یحیایی", album: "خاطره‌ها" },
  { id: 4, title: "دلگیرم", artist: "معین زد", album: "بی‌نام" },
  { id: 5, title: "پرواز", artist: "احسان خواجه‌امیری", album: "سلام آخر" },
  { id: 6, title: "دیوونه", artist: "سیروان خسروی", album: "جاده رؤیاها" },
];

export default function InteractiveSearchBox() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredSongs([]);
        return;
      }

      const term = searchTerm.toLowerCase();
      const filtered = dummySongs.filter(
        (song) =>
          song.title.toLowerCase().includes(term) ||
          song.artist.toLowerCase().includes(term) ||
          song.album.toLowerCase().includes(term)
      );

      setFilteredSongs(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="w-44 lg:w-full lg:max-w-lg relative">
      <input
        type="text"
        placeholder="جستجو موسیقی، هنرمند، آلبوم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white text-gray-500 border rounded lg:rounded-box p-1 lg:p-2 border-gray-300 outline-none text-xs lg:text-base"
      />

      {searchTerm && (
        <ul className="absolute top-7 lg:top-12 border border-gray-300 rounded lg:rounded-box shadow w-full z-10 p-1 lg:p-2 bg-white">
          {filteredSongs.length === 0 ? (
            <li className="text-center text-xs lg:text-sm text-gray-500">
              موردی یافت نشد
            </li>
          ) : (
            filteredSongs.map((song, index) => (
              <li
                key={song.id}
                className={`p-2 hover:bg-base-200 rounded-se-box cursor-pointer ${
                  index !== filteredSongs.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <h3 className="text-xs lg:text-sm">{song.title}</h3>
                <div className="text-xs lg:text-sm opacity-70">
                  {song.artist} - {song.album}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
