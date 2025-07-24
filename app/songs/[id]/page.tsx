import { notFound } from "next/navigation";
import React from "react";

const dummySongs = [
  { id: 1, title: "بی‌تو", artist: "محسن یگانه", lyrics: "متن آهنگ بی‌تو ..." },
  {
    id: 2,
    title: "چشمای تو",
    artist: "محسن چاوشی",
    lyrics: "متن آهنگ چشمای تو ...",
  },
  {
    id: 3,
    title: "عاشق شدم",
    artist: "مجید یحیایی",
    lyrics: "متن آهنگ عاشق شدم ...",
  },
  {
    id: 4,
    title: "پرواز",
    artist: "احسان خواجه‌امیری",
    lyrics: "متن آهنگ پرواز ...",
  },
];

type SongPageProps = {
  params: { id: string };
};

const SongDetailsPage = ({ params }: SongPageProps) => {
  const song = dummySongs.find((s) => s.id === Number(params.id));
  if (!song) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{song.title}</h1>
      <p className="text-gray-600 mb-4">خواننده: {song.artist}</p>
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">متن آهنگ:</h2>
        <p className="text-gray-800 whitespace-pre-line">{song.lyrics}</p>
      </div>
    </div>
  );
};

export default SongDetailsPage;
