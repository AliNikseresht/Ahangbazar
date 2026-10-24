import { Pause, Play } from "lucide-react";
import type { Language } from "@/data/ahang";
import type { Track } from "@/lib/tracks";

export function MusicCard({
  track,
  language,
  play,
  current,
  playing,
}: {
  track: Track;
  language: Language;
  play: () => void;
  current: boolean;
  playing: boolean;
}) {
  const title = language === "fa" ? track.faTitle || track.title : track.title;
  const artist =
    language === "fa" ? track.faArtist || track.artist : track.artist;

  return (
    <article className="music-card">
      <button className="art-button" onClick={play}>
        <img src={track.art || "/placeholder.png"} alt="" />
        <i>
          {current && playing ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" />
          )}
        </i>
      </button>
      <h3>{title}</h3>
      <p>{artist}</p>
    </article>
  );
}
