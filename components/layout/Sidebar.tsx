"use client";

import React, { useState } from "react";
import SidebarBox from "./sidebar/SidebarBox";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "@/services/fetchArtists";
import { Artists } from "@/types/artists";
import {
  fetchSuggestedSongs,
  SuggestedSong,
} from "@/services/fetchSuggestedSongs";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: artists,
    isLoading: artistsLoading,
    isError: artistsError,
  } = useQuery<Artists[]>({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  const {
    data: suggestedSongs,
    isLoading: songsLoading,
    isError: songsError,
  } = useQuery<SuggestedSong[]>({
    queryKey: ["suggestedSongs"],
    queryFn: fetchSuggestedSongs,
  });

  if (artistsLoading || songsLoading) return <div>در حال بارگذاری...</div>;
  if (artistsError) return <div>خطا در دریافت خواننده‌ها</div>;
  if (songsError) return <div>خطا در دریافت آهنگ‌های پیشنهادی</div>;

  return (
    <>
      <aside className="hidden lg:block row-start-2 col-start-1 col-end-2 fixed top-[83px] right-4 bottom-0 min-w-[250px] space-y-4 z-20">
        <SidebarBox
          basePath="artists"
          title="خواننده‌ها"
          items={
            artists?.map((artist) => ({
              id: artist.id,
              title: artist.name_fa || artist.name,
              slug: artist.slug,
            })) || []
          }
        />

        <SidebarBox
          basePath="songs"
          title="آهنگ‌های پیشنهادی"
          items={
            suggestedSongs && suggestedSongs.length > 0
              ? suggestedSongs.map((song) => ({
                  id: song.id,
                  title: song.title,
                  subtitle: song.artist,
                }))
              : [{ id: 0, title: "آهنگی نیست" }]
          }
        />
      </aside>

      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#40ad6d] to-[#08aadb] text-white p-3 rounded-full shadow-lg"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open Sidebar"
      >
        <Menu size={24} />
      </button>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <span>دسته بندی</span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <div className="py-2 space-y-2">
          <SidebarBox
            basePath="artists"
            title="خواننده‌ها"
            items={
              artists?.map((artist) => ({
                id: artist.id,
                title: artist.name_fa || artist.name,
                slug: artist.slug,
              })) || []
            }
          />

          <SidebarBox
            basePath="songs"
            title="آهنگ‌های پیشنهادی"
            items={
              suggestedSongs && suggestedSongs.length > 0
                ? suggestedSongs.map((song) => ({
                    id: song.id,
                    title: song.title,
                    subtitle: song.artist,
                  }))
                : [{ id: 0, title: "آهنگی نیست" }]
            }
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
