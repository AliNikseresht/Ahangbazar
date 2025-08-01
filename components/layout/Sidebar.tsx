"use client";

import React, { useState } from "react";
import SidebarBox from "./sidebar/SidebarBox";
import { ChevronLeft, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "@/services/fetchArtists";
import { Artists } from "@/types/artists";
import { fetchSuggestedSongs } from "@/services/fetchSuggestedSongs";
import { SuggestedSong } from "@/types/suggestedSong";

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
      <aside className="hidden lg:block row-start-2 col-start-1 col-end-2 fixed top-[83px] right-4 bottom-0 min-w-[300px] max-w-[300px] space-y-2 z-20">
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
        className="lg:hidden fixed top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-50 border-t-2 border-l-2 border-b-2 border-[#40ad6d] bg-[#242424] text-[#40ad6d] py-6 rounded-e-md shadow-lg"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open Sidebar"
      >
        <ChevronLeft size={24} />
      </button>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={` fixed top-0 right-0 h-full w-72 p-5 bg-white rounded-e-2xl shadow-lg z-50
          transform transition-transform duration-300 ease-in-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <p className="text-xl">دسته بندی</p>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={28} />
          </button>
        </div>
        <div className="py-2 space-y-6">
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
