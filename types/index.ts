export type Language = "en" | "fa";
export type View = "home" | "search" | "library";

export type Track = {
  id: string;
  title: string;
  faTitle?: string | null;
  artist: string;
  faArtist?: string | null;
  art?: string | null;
  audioUrl?: string | null;
  time: string;
  plays: number;
  favorites: number;
};

export type Artist = {
  id: string;
  name: string;
  faName?: string | null;
  coverUrl?: string | null;
};

export type Category = {
  id: string;
  name: string;
};

export type PlayerState = {
  playing: boolean;
  currentId: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  repeat: boolean;
  shuffle: boolean;
  full: boolean;
  queue: boolean;
};

export type AppState = {
  tracks: Track[];
  artists: Artist[];
  categories: Category[];
  language: Language;
  view: View;
  light: boolean;
  query: string;
  favorites: string[];
  loading: boolean;
};