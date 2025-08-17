export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
  isPlaying?: boolean;
  audio?: string;
  favorites: number;
  genre?: string;
  rating?: number;
}
