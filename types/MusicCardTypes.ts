import { Track } from "./tracksType";

export interface MusicCardTypes {
  track: Track;
  onPlay: (track: Track) => void;
  onDownload?: (track: Track) => void;
  variant?: "grid" | "list";
  labels?: {
    addToPlaylist?: string;
    share?: string;
    viewArtist?: string;
    trending?: string;
    playsSuffix?: string;
  };
}