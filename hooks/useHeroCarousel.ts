import { useEffect, useState, useCallback } from "react";
import { FeaturedTrack } from "@/types/heroSectionType";
import { Track } from "@/types/tracksType";
import { SLIDE_INTERVAL } from "@/components/hero-section/hero";

export function useHeroCarousel(tracks?: Track[], onPlay?: (t: Track) => void) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<FeaturedTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (!tracks?.length) return;
    const track = tracks[currentIndex];
    if (!track) return;

    setCurrentTrack({
      ...track,
      plays: track.plays ?? 0,
      genre: track.genre ?? "Unknown",
      rating: track.rating ?? 0,
    });
  }, [currentIndex, tracks]);

  useEffect(() => {
    if (!tracks?.length || !autoSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [tracks, autoSlide]);

  const handlePlay = useCallback(
    (track?: FeaturedTrack) => {
      setIsPlaying(true);
      setAutoSlide(false);
      if (track) setCurrentTrack(track);
      if (onPlay && track) onPlay(track);
    },
    [onPlay]
  );

  const handlePlayPause = useCallback(() => setIsPlaying((prev) => !prev), []);

  const handleNext = useCallback(() => {
    if (tracks?.length) setCurrentIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks]);

  const handlePrevious = useCallback(() => {
    if (tracks?.length)
      setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks]);

  return {
    currentTrack,
    isPlaying,
    handlePlay,
    handlePlayPause,
    handleNext,
    handlePrevious,
  };
}
