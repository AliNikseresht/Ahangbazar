import { Song } from "@/types/song";
import { getPublicAudioUrl } from "@/utils/getPublicAudioUrl";
import { Download, Pause, Play } from "lucide-react";

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
    <div className="w-full border border-[#40ad6d] rounded-lg flex items-center justify-between shadow-sm transition overflow-hidden p-1.5 gap-2">
      <div className="flex items-center justify-center gap-2">
        <a
          href={getPublicAudioUrl(song.storage_path)}
          download
          className="bg-[#08aadb] p-1.5 text-white transition duration-200 rounded-full"
        >
          <Download size={18} />
        </a>
        <button
          className=" bg-[#40ad6d] p-1.5 text-white transition duration-200 cursor-pointer rounded-full"
          onClick={() => (isPlaying ? onPause() : onPlay(song))}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="font-bold text-xs lg:text-sm truncate">
          {song.title}
        </h3>
        <p className="text-gray-500 text-xs">{song.album || ""}</p>
      </div>
    </div>
  );
};
