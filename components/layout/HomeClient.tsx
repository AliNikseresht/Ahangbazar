"use client";

import { useCallback, useEffect, useState } from "react";
import type { Artist, Category, Language, Track, View } from "@/types";
import { getArtists } from "@/lib/artists";
import { getCategories } from "@/lib/categories";
import { enrichTracks } from "@/lib/enrich";
import { getTracks } from "@/lib/tracks";
import { PlayerProvider } from "../../context/PlayerContext";
import { HomeClientInner } from "./HomeClientInner";

type Props = {
  initialTracks: Track[];
  initialArtists: Artist[];
  initialCategories: Category[];
};

export default function HomeClient({
  initialTracks,
  initialArtists,
  initialCategories,
}: Props) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [artists, setArtists] = useState<Artist[]>(initialArtists);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<View>("home");
  const [light, setLight] = useState(false);
  const [query, setQuery] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [songs, arts, cats] = await Promise.all([
        getTracks(),
        getArtists(),
        getCategories(),
      ]);
      const tracksFinal = enrichTracks(songs, arts);
      setTracks(tracksFinal);
      setArtists(arts);
      setCategories(cats);
    } catch (error) {
      console.error("Failed to load data:", error);
      setTracks([]);
      setArtists([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialTracks.length) void loadAll();
  }, [initialTracks.length, loadAll]);

  const initialId =
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("track") ??
        initialTracks[0]?.id ??
        null)
      : (initialTracks[0]?.id ?? null);

  return (
    <PlayerProvider tracks={tracks} initialId={initialId} language={language}>
      <HomeClientInner
        tracks={tracks}
        artists={artists}
        categories={categories}
        language={language}
        setLanguage={setLanguage}
        light={light}
        setLight={setLight}
        view={view}
        setView={setView}
        query={query}
        setQuery={setQuery}
        loadAll={loadAll}
        loading={loading}
      />
    </PlayerProvider>
  );
}
