import { getSongById } from "@/services/fetchSongById";
import { notFound } from "next/navigation";

type SongPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SongPage({ params }: SongPageProps) {
  const { id } = await params;
  const song = await getSongById(id);
  if (!song) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{song.title}</h1>
      <p className="text-gray-600 mb-1">خواننده: {song.artist}</p>
    </div>
  );
}
