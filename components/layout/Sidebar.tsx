"use client";

import React, { useState } from "react";
import SidebarBox from "./sidebar/SidebarBox";
import { Menu, X } from "lucide-react";

type Artists = {
  id: number;
  title: string;
};

type Songs = {
  id: number;
  title: string;
  artist: string;
};

const dummyArtists: Artists[] = [
  { id: 1, title: "محسن یگانه" },
  { id: 2, title: "محسن چاوشی" },
  { id: 3, title: "سیروان خسروی" },
  { id: 4, title: "معین زد" },
  { id: 5, title: "احسان خواجه‌امیری" },
  { id: 6, title: "احسان خواجه‌امیری" },
  { id: 7, title: "احسان خواجه‌امیری" },
  { id: 8, title: "احسان خواجه‌امیری" },
  { id: 9, title: "احسان خواجه‌امیری" },
];

const suggestedSongs: Songs[] = [
  { id: 1, title: "بی‌تو", artist: "محسن یگانه" },
  { id: 2, title: "چشمای تو", artist: "محسن چاوشی" },
  { id: 3, title: "عاشق شدم", artist: "مجید یحیایی" },
  { id: 4, title: "پرواز", artist: "احسان خواجه‌امیری" },
  { id: 5, title: "عاشق شدم", artist: "مجید یحیایی" },
  { id: 6, title: "عاشق شدم", artist: "مجید یحیایی" },
  { id: 7, title: "عاشق شدم", artist: "مجید یحیایی" },
  { id: 8, title: "عاشق شدم", artist: "مجید یحیایی" },
  { id: 9, title: "عاشق شدم", artist: "مجید یحیایی" },
];

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex w-72 flex-col gap-4">
        <SidebarBox
          basePath="artists"
          title="خواننده‌ها"
          items={dummyArtists}
        />
        <SidebarBox
          basePath="songs"
          title="آهنگ‌های پیشنهادی"
          items={suggestedSongs}
        />
      </aside>
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#40ad6d] to-[#08aadb] text-white p-3 rounded-full shadow-lg"
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
            items={dummyArtists}
          />
          <SidebarBox
            basePath="songs"
            title="آهنگ‌های پیشنهادی"
            items={suggestedSongs.map((song) => ({
              id: song.id,
              title: song.title,
              subtitle: song.artist,
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
