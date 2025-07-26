import { notFound } from "next/navigation";
import React from "react";

// Update the type to handle async params
type SongPageProps = {
  params: Promise<{ id: string }>;
};

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

const SongDetailsPage = async ({ params }: SongPageProps) => {
  // Await the params to get the resolved params
  const { id } = await params;

  const song = dummySongs.find((s) => s.id === Number(id));
  if (!song) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
      <p className="text-gray-700">{song.lyrics}</p>
    </div>
  );
};

export default SongDetailsPage;
