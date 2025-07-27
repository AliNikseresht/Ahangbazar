import { Song } from "@/types/song";
import { getPublicAudioUrl } from "@/utils/getPublicAudioUrl";
import { getPublicCoverUrl } from "@/utils/getPublicCoverUrl";
import { Download, Pause, Play } from "lucide-react";
import Image from "next/image";

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
  onPause: () => void;
}

export const SongCard = ({
  song,
  isPlaying,
  onPlay,
  onPause,
}: SongCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg flex flex-col shadow-sm transition overflow-hidden">
      <div className="relative w-full h-28 bg-gray-100">
        <Image
          src={getPublicCoverUrl(song.cover_image_url)}
          alt={song.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="py-2 text-center">
        <h3 className="font-bold text-xs lg:text-sm truncate">{song.title}</h3>
        <p className="text-gray-500 text-xs">{song.album || "—"}</p>
      </div>

      <div className="w-full p-2 flex items-center justify-center gap-3">
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white transition duration-200 cursor-pointer shadow"
          onClick={() => (isPlaying ? onPause() : onPlay(song))}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <a
          href={getPublicAudioUrl(song.storage_path)}
          download
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-200 shadow"
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
};
