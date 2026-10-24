"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useFavorites } from "@/hooks/useFavorites";
import type { Language, Track } from "@/types";

type PlayerContextValue = ReturnType<typeof useAudioPlayer> &
  ReturnType<typeof useFavorites> & {
    language: Language;
    trackLabel: (track: Track) => string;
    trackUrl: (track: Track) => string;
  };

const PlayerContext = createContext<PlayerContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
  tracks: Track[];
  initialId?: string | null;
  language: Language;
};

export function PlayerProvider({
  children,
  tracks,
  initialId,
  language,
}: ProviderProps) {
  const audio = useAudioPlayer({ tracks, initialId });
  const fav = useFavorites();

  const trackLabel = useCallback(
    (track: Track) => {
      const title =
        language === "fa" ? track.faTitle || track.title : track.title;
      const artist =
        language === "fa" ? track.faArtist || track.artist : track.artist;
      return `${title} — ${artist}`;
    },
    [language],
  );

  const trackUrl = useCallback((track: Track) => {
    if (typeof window === "undefined") return `/track/${track.id}`;
    return `${window.location.origin}/track/${track.id}`;
  }, []);

  const value = useMemo(
    () => ({
      ...audio,
      ...fav,
      language,
      trackLabel,
      trackUrl,
    }),
    [audio, fav, language, trackLabel, trackUrl],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}