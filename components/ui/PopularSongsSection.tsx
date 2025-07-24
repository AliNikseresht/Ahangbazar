import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Download, Play } from "lucide-react";

type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

const dummySongs: Song[] = [
  {
    id: 1,
    title: "بی تو",
    artist: "محسن یگانه",
    cover: "/ahangbazar-logo.png",
  },
  {
    id: 2,
    title: "چشمای تو",
    artist: "محسن چاوشی",
    cover: "/ahangbazar-logo.png",
  },
  {
    id: 3,
    title: "پرواز",
    artist: "احسان خواجه امیری",
    cover: "/ahangbazar-logo.png",
  },
  {
    id: 4,
    title: "خاطره ها",
    artist: "سیروان خسروی",
    cover: "/ahangbazar-logo.png",
  },
  {
    id: 5,
    title: "عاشق شدم",
    artist: "مجید یحیایی",
    cover: "/ahangbazar-logo.png",
  },
];

const SongCard = ({ song }: { song: Song }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
      <Image
        src={song.cover}
        alt={song.title}
        width={120}
        height={120}
        className="w-28 h-28 mb-3 object-contain"
      />
      <h3 className="font-bold text-base">{song.title}</h3>
      <p className="text-gray-600 text-sm">{song.artist}</p>
      <div className="flex items-center gap-3 mt-3">
        <button>
          <Download color="#08aadb" />
        </button>
        <button>
          <Play size={20} color="#212121" />
        </button>
      </div>
    </div>
  );
};

const PopularSongsSection = () => {
  return (
    <div className="w-full shadow rounded-xl p-5 flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-semibold">برترین آهنگ ها</h2>
        <Link href="/all-tops" className="text-blue-600 hover:underline">
          مشاهده همه
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {dummySongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default PopularSongsSection;
