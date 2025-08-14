export interface FeaturedTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  genre: string;
  plays: number;
  rating: number;
  duration: string;
  audio?: string;
}

export interface HeroSectionProps {
  featuredTrack?: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}
