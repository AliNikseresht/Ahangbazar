"use client";

import { supabase } from "@/libs/supabase/supabaseClient";
import { useState, useEffect } from "react";

type SongFromDb = {
  id: string;
  title: string | null;
  persian_title: string | null;
  album: string | null;
  artists: {
    name: string | null;
    name_fa: string | null;
  }[];
};

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
};

export default function InteractiveSearchBox() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSongs([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      const term = `%${searchTerm}%`;

      const { data: artistsData, error: artistsError } = await supabase
        .from("artists")
        .select("id")
        .or(`name.ilike.${term},name_fa.ilike.${term}`);

      if (artistsError) {
        console.error("Error fetching artists:", artistsError);
        setFilteredSongs([]);
        setLoading(false);
        return;
      }

      const artistIds = artistsData?.map((a) => a.id) ?? [];

      let query = supabase
        .from("songs")
        .select(
          `
    id,
    title,
    persian_title,
    album,
    artists (
      name,
      name_fa
    )
  `
        )
        .or(`title.ilike.${term},persian_title.ilike.${term}`);

      if (artistIds.length > 0) {
        query = query.in("artist_id", artistIds);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching songs:", error);
        setFilteredSongs([]);
        setLoading(false);
        return;
      }

      const songs = (data ?? []).map((item: SongFromDb) => {
        const artist =
          item.artists.length > 0
            ? item.artists[0].name_fa || item.artists[0].name || "ناشناخته"
            : "ناشناخته";

        return {
          id: item.id,
          title: item.persian_title || item.title || "بدون عنوان",
          album: item.album ?? "تک آهنگ",
          artist,
        };
      });

      setFilteredSongs(songs);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="w-44 md:w-full md:max-w-xl relative">
      <input
        type="text"
        placeholder="جستجو موسیقی، هنرمند، آلبوم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent text-gray-500 border rounded lg:rounded-box p-1 lg:p-2.5 border-gray-300 outline-none text-xs lg:text-sm"
      />

      {searchTerm && (
        <ul className="absolute top-7 md:top-9 border border-gray-300 rounded md:rounded-box shadow w-full z-10 p-1 md:p-2 bg-white max-h-60 overflow-auto">
          {loading ? (
            <li className="text-center text-xs md:text-sm text-gray-500">
              در حال بارگذاری...
            </li>
          ) : filteredSongs.length === 0 ? (
            <li className="text-center text-xs md:text-sm text-gray-500">
              موردی یافت نشد
            </li>
          ) : (
            filteredSongs.map((song, index) => (
              <li
                key={song.id}
                className={`p-2 hover:bg-gray-100 rounded-se-box cursor-pointer ${
                  index !== filteredSongs.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }`}
              >
                <h3 className="text-xs md:text-base mb-1">{song.title}</h3>
                <div className="text-xs md:text-sm opacity-70">
                  {song.artist} - {song.album || "تک آهنگ"}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
