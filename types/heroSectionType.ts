export interface FeaturedTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  genre: string;
  plays: number;
  rating: number;
  duration: string;
}

export interface HeroSectionProps {
  featuredTrack?: FeaturedTrack;
  onPlay?: (track: FeaturedTrack) => void;
}
