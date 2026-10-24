"use client";

import { useCallback, useRef, useState } from "react";
import { HomeView } from "@/components/ahang/views/HomeView";
import { SearchView } from "@/components/ahang/views/SearchView";
import { LibraryView } from "@/components/ahang/views/LibraryView";
import { PlayerBar } from "@/components/ahang/player/PlayerBar";
import { FullPlayer } from "@/components/ahang/player/FullPlayer";
import { QueuePanel } from "@/components/ahang/player/QueuePanel";
import { ShareSheet } from "@/components/ahang/share/ShareSheet";
import { Toast } from "@/components/ahang/Toast";
import { EmptyMusicState } from "@/components/ahang/EmptyMusicState";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useToast } from "@/hooks/useToast";
import { useTrackSearch } from "@/hooks/useTrackSearch";
import { normalizeText } from "@/lib/music/ui-utils";
import type { Artist, Category, Language, Track, View } from "@/types";
import Loading from "@/app/loading";
import { usePlayer } from "../../context/PlayerContext";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";

type Props = {
  tracks: Track[];
  artists: Artist[];
  categories: Category[];
  language: Language;
  setLanguage: (l: Language) => void;
  light: boolean;
  setLight: (v: boolean | ((p: boolean) => boolean)) => void;
  view: View;
  setView: (v: View) => void;
  query: string;
  setQuery: (q: string) => void;
  loadAll: () => Promise<void>;
  loading: boolean;
};

export function HomeClientInner({
  tracks,
  artists,
  categories,
  language,
  setLanguage,
  light,
  setLight,
  view,
  setView,
  query,
  setQuery,
  loadAll,
  loading,
}: Props) {
  const { current, play, trackLabel, trackUrl } = usePlayer();

  const [full, setFull] = useState(false);
  const [queue, setQueue] = useState(false);
  const [shareFor, setShareFor] = useState<Track | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const { toast, showToast } = useToast();
  const { results } = useTrackSearch(tracks, artists, query);

  const openSearch = useCallback(() => {
    setView("search");
    searchRef.current?.focus();
  }, [setView]);

  useKeyboardShortcuts({
    onSearchFocus: openSearch,
    onEscape: () => setShareFor(null),
  });

  const openArtist = useCallback(
    (artist: Artist) => {
      setQuery(
        language === "fa" ? (artist.faName ?? artist.name) : artist.name,
      );
      setView("search");
      const first = tracks.find(
        (tr) => normalizeText(tr.artist) === normalizeText(artist.name),
      );
      if (first) play(first.id);
    },
    [language, tracks, play, setQuery, setView],
  );

  const copyLink = async (track: Track) => {
    const url = trackUrl(track);
    try {
      await navigator.clipboard.writeText(url);
      showToast(language === "fa" ? "لینک کپی شد" : "Link copied");
      setShareFor(null);
    } catch {
      window.prompt(language === "fa" ? "لینک را کپی کنید" : "Copy link", url);
    }
  };

  const nativeShare = async (track: Track) => {
    try {
      await navigator.share({
        title: trackLabel(track),
        text: trackLabel(track),
        url: trackUrl(track),
      });
      setShareFor(null);
    } catch {
      /* cancelled */
    }
  };

  const downloadTrack = (track: Track) => {
    if (!track.audioUrl) return;
    const base = track.title.toLowerCase().includes(track.artist.toLowerCase())
      ? track.title
      : `${track.artist} - ${track.title}`;
    const fileName = `${base.replace(/[\\/:*?"<>|]/g, "").trim()}.mp3`;
    const a = document.createElement("a");
    a.href = `${track.audioUrl}${track.audioUrl.includes("?") ? "&" : "?"}download=${encodeURIComponent(fileName)}`;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(language === "fa" ? "دانلود شروع شد" : "Download started");
  };

  if (loading) return <Loading />;
  if (!tracks.length || !current) {
    return <EmptyMusicState onRetry={() => void loadAll()} />;
  }

  return (
    <div
      className={`app ${light ? "light" : ""}`}
      dir={language === "fa" ? "rtl" : "ltr"}
      lang={language}
    >
      <Sidebar
        view={view}
        language={language}
        light={light}
        onViewChange={setView}
        onToggleLight={() => setLight((v) => !v)}
        onToggleLanguage={() => setLanguage(language === "en" ? "fa" : "en")}
      />

      <div className="page">
        <Topbar
          ref={searchRef}
          language={language}
          light={light}
          query={query}
          view={view}
          onQueryChange={setQuery}
          onViewChange={setView}
          onToggleLight={() => setLight((v) => !v)}
          onToggleLanguage={() => setLanguage(language === "en" ? "fa" : "en")}
        />

        <main>
          {view === "home" && (
            <HomeView
              tracks={tracks}
              artists={artists}
              categories={categories}
              onOpenSearch={openSearch}
              onOpenArtist={openArtist}
            />
          )}
          {view === "search" && <SearchView results={results} />}
          {view === "library" && <LibraryView tracks={tracks} />}
        </main>
      </div>

      <PlayerBar
        onOpenFull={() => setFull(true)}
        onToggleQueue={() => setQueue((v) => !v)}
        queueOpen={queue}
      />

      <BottomNav view={view} language={language} onViewChange={setView} />

      {queue && <QueuePanel tracks={tracks} onClose={() => setQueue(false)} />}

      {full && (
        <FullPlayer
          onClose={() => setFull(false)}
          onOpenQueue={() => setQueue(true)}
          onShare={() => setShareFor(current)}
          onDownload={() => downloadTrack(current)}
        />
      )}

      {shareFor && (
        <ShareSheet
          track={shareFor}
          onClose={() => setShareFor(null)}
          onCopyLink={copyLink}
          onNativeShare={nativeShare}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
