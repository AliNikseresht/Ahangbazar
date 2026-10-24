import { MoreHorizontal, Volume2 } from "lucide-react";
import { IconButton } from "./IconButton";
import type { Language, Track } from "@/types";

export function TrackRow({
  track,
  language,
  index,
  play,
  current = false,
}: {
  track: Track;
  language: Language;
  index: number;
  play: () => void;
  current?: boolean;
}) {
  const title = language === "fa" ? track.faTitle || track.title : track.title;
  const artist =
    language === "fa" ? track.faArtist || track.artist : track.artist;

  return (
    <div className={`track-row ${current ? "current" : ""}`}>
      <span>
        {current ? <Volume2 size={14} /> : String(index + 1).padStart(2, "0")}
      </span>
      <button className="row-info" onClick={play}>
        <img src={track.art || "/placeholder.png"} alt="" />
        <span>
          <b>{title}</b>
          <small>{artist}</small>
        </span>
      </button>
      <small>{track.time}</small>
      <IconButton label="More options">
        <MoreHorizontal size={18} />
      </IconButton>
    </div>
  );
}