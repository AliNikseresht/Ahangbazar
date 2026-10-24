"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Compass,
  Heart,
  Home,
  Languages,
  Library,
  ListMusic,
  Maximize2,
  Menu,
  MoreHorizontal,
  Moon,
  Pause,
  Play,
  Repeat2,
  Search,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Sun,
  Volume2,
  X,
  Mic2,
  Download,
  Send,
  MessageCircle,
  Link2,
} from "lucide-react";

import { Brand } from "@/components/ahang/Brand";
import { IconButton } from "@/components/ahang/IconButton";
import { SectionTitle } from "@/components/ahang/SectionTitle";
import { TrackRow } from "@/components/ahang/TrackRow";
import { copy, image, type Language, type View } from "@/data/ahang";
import { getArtists, type Artist } from "@/lib/artists";
import { getCategories, type Category } from "@/lib/categories";
import { getTracks, type Track } from "@/lib/tracks";
import Loading from "./loading";

const GENRE_COLORS = [
  "#624D3B",
  "#334A48",
  "#523C41",
  "#3A4057",
  "#5A5135",
  "#4A3F35",
];

function formatTime(s: number) {
  if (!s || Number.isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[أإآ]/g, "ا")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/\u200c/g, " ")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function EmptyMusicState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="empty-screen">
      <div className="empty-ambient" />
      <div className="empty-content">
        <div className="empty-emblem">
          <div className="empty-ring" />
          <div className="empty-icon">
            <span>♫</span>
          </div>
          <span className="empty-spark empty-spark-one">✦</span>
          <span className="empty-spark empty-spark-two">✧</span>
        </div>
        <span className="empty-eyebrow">AHANGBAZAR COLLECTION</span>
        <h1>Silence, for now.</h1>
        <p className="empty-description">
          There&apos;s no music here just yet.
          <br />
          Your next favorite song is waiting to be discovered.
        </p>
        <button className="empty-retry" onClick={onRetry}>
          <span>Try again</span>
          <span className="empty-retry-arrow">↗</span>
        </button>
        <div className="empty-divider">
          <span />
          <i>♫</i>
          <span />
        </div>
        <p className="empty-footer">
          EVERY GREAT SONG STARTS WITH A MOMENT OF SILENCE
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artistsList, setArtistsList] = useState<Artist[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<View>("home");
  const [light, setLight] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [full, setFull] = useState(false);
  const [queue, setQueue] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const tracksRef = useRef<Track[]>([]);
  const currentIdRef = useRef<string | null>(null);
  const repeatRef = useRef(false);
  const shuffleRef = useRef(false);

  const t = copy[language];

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);
  useEffect(() => {
    currentIdRef.current = currentId;
  }, [currentId]);
  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);
  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);

  // ⌘K / Ctrl+K => focus the single search input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setView("search");
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShareFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // favorites از localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ab_favorites");
      if (raw) setFavorites(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ab_favorites", JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [songs, arts, cats] = await Promise.all([
        getTracks(),
        getArtists(),
        getCategories(),
      ]);

      // اگر آهنگ عکس نداشت، عکس خواننده را بگذار
      const coverByName = new Map<string, string>();
      for (const a of arts) {
        if (a.coverUrl) coverByName.set(normalizeText(a.name), a.coverUrl);
      }
      const faByName = new Map<string, string>();
      for (const a of arts) {
        if (a.faName) faByName.set(normalizeText(a.name), a.faName);
      }

      const tracksFinal = songs.map((s) => ({
        ...s,
        art: s.art || coverByName.get(normalizeText(s.artist)) || null,
        faArtist: s.faArtist || faByName.get(normalizeText(s.artist)) || null,
      }));

      setTracks(tracksFinal);
      setArtistsList(arts);
      setCategories(cats);
      const sharedId = new URLSearchParams(window.location.search).get("track");
      setCurrentId(
        tracksFinal.find((x) => x.id === sharedId)?.id ??
          tracksFinal[0]?.id ??
          null,
      );
    } catch (error) {
      console.error("Failed to load data:", error);
      setTracks([]);
      setArtistsList([]);
      setCategories([]);
      setCurrentId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAll();
  }, []);

  const current =
    tracks.find((track) => track.id === currentId) ?? tracks[0] ?? null;

  const artistCovers = useMemo(() => {
    const map = new Map<string, string>();
    for (const tr of tracks) {
      if (tr.art && tr.artist && !map.has(tr.artist)) {
        map.set(tr.artist, tr.art);
      }
    }
    return map;
  }, [tracks]);

  const goNext = () => {
    const list = tracksRef.current;
    const id = currentIdRef.current;
    if (!list.length || !id) return;

    let next: Track | undefined;
    if (shuffleRef.current) {
      const others = list.filter((x) => x.id !== id);
      next = others[Math.floor(Math.random() * others.length)] ?? list[0];
    } else {
      const i = list.findIndex((x) => x.id === id);
      next = list[(i + 1) % list.length];
    }
    if (next) {
      setCurrentId(next.id);
      setPlaying(true);
    }
  };

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (repeatRef.current) {
        audio.currentTime = 0;
        void audio.play();
      } else {
        goNext();
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!current?.audioUrl) {
      audio.pause();
      setPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    const audioUrl = current.audioUrl;

    if (audio.getAttribute("src") !== audioUrl) {
      audio.pause();
      audio.src = audioUrl;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
    }

    if (playing) {
      void audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentId, current?.audioUrl, playing]);

  const changeVolume = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    let ratio = (e.clientX - r.left) / r.width;
    if (language === "fa") ratio = 1 - ratio;
    ratio = Math.min(1, Math.max(0, ratio));
    setVolume(ratio);
    setMuted(ratio === 0);
  };

  const toggleMute = () => {
    if (muted || volume === 0) {
      setMuted(false);
      if (volume === 0) setVolume(0.8);
    } else {
      setMuted(true);
    }
  };

  const artistFa = useMemo(() => {
    const m = new Map<string, string>();
    for (const a of artistsList) {
      if (a.faName) m.set(normalizeText(a.name), a.faName);
    }
    return m;
  }, [artistsList]);

  const results = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return tracks.slice(0, 8);
    return tracks.filter((track) =>
      [
        track.title,
        track.faTitle,
        track.artist,
        track.faArtist,
        artistFa.get(normalizeText(track.artist)),
      ]
        .filter(Boolean)
        .some((v) => normalizeText(String(v)).includes(q)),
    );
  }, [query, tracks, artistFa]);

  const play = (id: string) => {
    if (currentId === id) setPlaying((v) => !v);
    else {
      setCurrentId(id);
      setPlaying(true);
    }
  };

  const openSearch = () => {
    setView("search");
    searchRef.current?.focus();
  };

  const openArtist = (artist: Artist) => {
    setQuery(language === "fa" ? (artist.faName ?? artist.name) : artist.name);
    setView("search");

    const first = tracks.find(
      (tr) => normalizeText(tr.artist) === normalizeText(artist.name),
    );
    if (first) play(first.id);
  };

  const playNext = () => goNext();

  const playPrev = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (!tracks.length || !currentId) return;
    const i = tracks.findIndex((x) => x.id === currentId);
    const prev = tracks[(i - 1 + tracks.length) % tracks.length];
    setCurrentId(prev.id);
    setPlaying(true);
  };

  const seek = (e: React.MouseEvent<HTMLElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width),
    );
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const favorite = (id: string) =>
    setFavorites((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shareFor, setShareFor] = useState<Track | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const trackUrl = (track: Track) =>
    `${window.location.origin}${window.location.pathname}?track=${track.id}`;

  const trackLabel = (track: Track) => {
    const title =
      language === "fa" ? track.faTitle || track.title : track.title;
    const artist =
      language === "fa" ? track.faArtist || track.artist : track.artist;
    return `${title} — ${artist}`;
  };

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
      /* کاربر بست */
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
      <aside className="sidebar">
        <Brand />
        <nav>
          <button
            className={view === "home" ? "active" : ""}
            onClick={() => setView("home")}
          >
            <Home size={20} />
            <span>{t.home}</span>
          </button>
          <button
            className={view === "search" ? "active" : ""}
            onClick={() => setView("search")}
          >
            <Compass size={20} />
            <span>{t.explore}</span>
          </button>
          <button
            className={view === "library" ? "active" : ""}
            onClick={() => setView("library")}
          >
            <Library size={20} />
            <span>{t.library}</span>
          </button>
        </nav>
        <div className="side-lists">
          <p>{t.playlists}</p>
          <button type="button" onClick={() => setView("library")}>
            <Heart size={15} />
            {t.favorites}
          </button>
          <button type="button">
            <Sparkles size={15} />
            {t.curated}
          </button>
        </div>
        <footer>
          <button onClick={() => setLight((v) => !v)}>
            {light ? <Moon size={18} /> : <Sun size={18} />}
            <span>{light ? "Obsidian" : "Ivory"} mode</span>
          </button>
          <button onClick={() => setLanguage(language === "en" ? "fa" : "en")}>
            <Languages size={18} />
            <span>{language === "en" ? "فارسی" : "English"}</span>
          </button>
        </footer>
      </aside>

      <div className="page">
        <header className="topbar">
          <button className="menu">
            <Menu size={21} />
          </button>
          <div className="mobile-brand">
            <Brand />
          </div>

          {/* تنها کادر جستجو (موبایل + دسکتاپ) */}
          <label className="search-trigger">
            <Search size={18} />
            <input
              ref={searchRef}
              type="search"
              dir="auto"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              placeholder={t.search}
              onChange={(e) => {
                setQuery(e.target.value);
                if (view !== "search") setView("search");
              }}
              onFocus={() => {
                if (view !== "search") setView("search");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            {query ? (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear"
                onClick={(e) => {
                  e.preventDefault();
                  setQuery("");
                  searchRef.current?.focus();
                }}
              >
                <X size={15} />
              </button>
            ) : (
              <kbd>⌘ K</kbd>
            )}
          </label>

          <div>
            <button
              className="lang"
              onClick={() => setLanguage(language === "en" ? "fa" : "en")}
            >
              {language === "en" ? "فا" : "EN"}
            </button>
            <IconButton
              label="Change theme"
              onClick={() => setLight((v) => !v)}
            >
              {light ? <Moon size={18} /> : <Sun size={18} />}
            </IconButton>
            <span className="avatar">A</span>
          </div>
        </header>

        <main>
          {view === "home" && (
            <>
              <div className="mobile-intro">
                <div>
                  <p>{t.hello}</p>
                  <h1>{t.intro}</h1>
                </div>
                <button onClick={openSearch} aria-label="Search">
                  <Search size={21} />
                </button>
              </div>

              <section className="hero">
                <img src={current.art || image.hero} alt={current.title} />
                <i className="shade" />
                <div className="hero-copy">
                  <span className="eyebrow">{t.exclusive}</span>
                  <h1>
                    {language === "fa"
                      ? current.faTitle || current.title
                      : current.title}
                  </h1>
                  <p>
                    {language === "fa"
                      ? current.faArtist || current.artist
                      : current.artist}
                  </p>
                  <div>
                    <button
                      className="primary"
                      onClick={() => play(current.id)}
                    >
                      {playing && currentId === current.id ? (
                        <Pause size={17} fill="currentColor" />
                      ) : (
                        <Play size={17} fill="currentColor" />
                      )}
                      {t.listen}
                    </button>
                    <button
                      className="secondary"
                      onClick={() => favorite(current.id)}
                    >
                      <Heart
                        size={17}
                        fill={
                          favorites.includes(current.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                      {t.save}
                    </button>
                  </div>
                </div>
                <small>01 / {String(tracks.length).padStart(2, "0")}</small>
              </section>

              <section className="content-section">
                <SectionTitle title={t.artists} action={t.see} />
                <div className="artist-row">
                  {artistsList.map((artist) => (
                    <button
                      key={artist.id}
                      type="button"
                      onClick={() => openArtist(artist)}
                    >
                      <img
                        src={
                          artist.coverUrl ||
                          artistCovers.get(artist.name) ||
                          image.hero
                        }
                        alt={artist.name}
                      />
                      <b>
                        {language === "fa"
                          ? artist.faName || artist.name
                          : artist.name}
                      </b>
                      <small>Artist</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="split">
                <div>
                  <SectionTitle title={t.releases} action={t.see} />
                  {tracks.slice(0, 5).map((track, i) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      language={language}
                      index={i}
                      play={() => play(track.id)}
                      current={track.id === currentId}
                    />
                  ))}
                </div>
                <article className="editorial">
                  <img src={tracks[1]?.art || image.dusk} alt="Featured" />
                  <div>
                    <span>EDITOR&apos;S NOTE</span>
                    <h2>{t.curated}</h2>
                    <p>Slow-burning songs for when the city finally softens.</p>
                    <button onClick={() => tracks[1] && play(tracks[1].id)}>
                      <Play size={18} fill="currentColor" />
                    </button>
                  </div>
                </article>
              </section>

              <section className="content-section genres">
                <SectionTitle title={t.genres} action={t.see} />
                <div className="genre-row">
                  {categories.map((cat, i) => (
                    <button
                      key={cat.id}
                      type="button"
                      style={
                        {
                          "--genre": GENRE_COLORS[i % GENRE_COLORS.length],
                        } as React.CSSProperties
                      }
                    >
                      <small>{String(i + 1).padStart(2, "0")}</small>
                      <b>{cat.name}</b>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {view === "search" && (
            <section className="subpage">
              <div className="page-title">
                <span className="eyebrow">{t.explore}</span>
                <h1>{t.searchTitle}</h1>
                <p>{t.searchBody}</p>
              </div>
              <div className="results">
                <SectionTitle
                  title={t.results}
                  action={`${results.length} results`}
                />
                {results.length ? (
                  results.map((track, i) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      language={language}
                      index={i}
                      play={() => play(track.id)}
                      current={track.id === currentId}
                    />
                  ))
                ) : (
                  <div className="empty">
                    <Search size={28} />
                    <h2>No music found</h2>
                    <p>Try an artist, track, album, or another spelling.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {view === "library" && (
            <section className="subpage">
              <div className="page-title">
                <span className="eyebrow">{t.library}</span>
                <h1>{t.libraryTitle}</h1>
                <p>{favorites.length} saved tracks</p>
              </div>
              <div className="tabs">
                <button className="active">{t.favorites}</button>
                <button>{t.playlists}</button>
                <button>{t.albums}</button>
              </div>
              <div className="library-hero">
                <div className="collage">
                  {tracks
                    .filter((x) => favorites.includes(x.id))
                    .slice(0, 4)
                    .map((x) => (
                      <img key={x.id} src={x.art || image.hero} alt="" />
                    ))}
                  {favorites.length === 0 &&
                    tracks
                      .slice(0, 4)
                      .map((x) => (
                        <img key={x.id} src={x.art || image.hero} alt="" />
                      ))}
                  <Heart size={28} fill="currentColor" />
                </div>
                <div>
                  <span>{t.playlists}</span>
                  <h2>{t.favorites}</h2>
                  <p>{favorites.length} tracks</p>
                  <button
                    className="primary"
                    onClick={() =>
                      favorites[0] ? play(favorites[0]) : undefined
                    }
                    disabled={!favorites.length}
                  >
                    <Play size={17} fill="currentColor" />
                    {t.listen}
                  </button>
                </div>
              </div>
              <div className="library-list">
                {tracks
                  .filter((x) => favorites.includes(x.id))
                  .map((track, i) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      language={language}
                      index={i}
                      play={() => play(track.id)}
                      current={track.id === currentId}
                    />
                  ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <div className="player">
        <i className="progress" onClick={seek} style={{ cursor: "pointer" }}>
          <b style={{ width: `${progress}%` }} />
        </i>

        <button className="now-playing" onClick={() => setFull(true)}>
          <img src={current.art || image.hero} alt="" />
          <span>
            <b>
              {language === "fa"
                ? current.faTitle || current.title
                : current.title}
            </b>
            <small>
              {language === "fa"
                ? current.faArtist || current.artist
                : current.artist}
            </small>
          </span>
          <Maximize2 size={15} />
        </button>

        <div className="controls">
          <IconButton
            label="Shuffle"
            active={shuffle}
            onClick={() => setShuffle((v) => !v)}
          >
            <Shuffle size={17} />
          </IconButton>
          <IconButton label="Previous" onClick={playPrev}>
            <SkipBack size={19} fill="currentColor" />
          </IconButton>
          <button className="play" onClick={() => setPlaying((v) => !v)}>
            {playing ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
          <IconButton label="Next" onClick={playNext}>
            <SkipForward size={19} fill="currentColor" />
          </IconButton>
          <IconButton
            label="Repeat"
            active={repeat}
            onClick={() => setRepeat((v) => !v)}
          >
            <Repeat2 size={17} />
          </IconButton>
        </div>

        <div className="tools">
          <IconButton
            label="Favorite"
            active={favorites.includes(current.id)}
            onClick={() => favorite(current.id)}
          >
            <Heart
              size={18}
              fill={favorites.includes(current.id) ? "currentColor" : "none"}
            />
          </IconButton>
          <IconButton
            label="Queue"
            active={queue}
            onClick={() => setQueue((v) => !v)}
          >
            <ListMusic size={19} />
          </IconButton>
          <Volume2
            size={18}
            onClick={toggleMute}
            style={{ cursor: "pointer", opacity: muted ? 0.4 : 1 }}
          />
          <span
            role="slider"
            aria-label="Volume"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((muted ? 0 : volume) * 100)}
            className="vol-line"
            style={
              {
                "--vol": `${(muted ? 0 : volume) * 100}%`,
              } as React.CSSProperties
            }
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              changeVolume(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) changeVolume(e);
            }}
          />
        </div>
      </div>

      <nav className="bottom-nav">
        <button
          className={view === "home" ? "active" : ""}
          onClick={() => setView("home")}
        >
          <Home size={20} />
          <span>{t.home}</span>
        </button>
        <button
          className={view === "search" ? "active" : ""}
          onClick={() => setView("search")}
        >
          <Search size={20} />
          <span>{t.explore}</span>
        </button>
        <button
          className={view === "library" ? "active" : ""}
          onClick={() => setView("library")}
        >
          <Library size={20} />
          <span>{t.library}</span>
        </button>
      </nav>

      {queue && (
        <aside className="queue">
          <header>
            <div>
              <span>{t.now}</span>
              <h2>{t.queue}</h2>
            </div>
            <IconButton label="Close" onClick={() => setQueue(false)}>
              <X size={20} />
            </IconButton>
          </header>
          <div className="queue-current">
            <img src={current.art || image.hero} alt="" />
            <div>
              <span>{t.now}</span>
              <b>
                {language === "fa"
                  ? current.faTitle || current.title
                  : current.title}
              </b>
              <small>
                {language === "fa"
                  ? current.faArtist || current.artist
                  : current.artist}
              </small>
            </div>
          </div>
          <div className="queue-label">
            <b>{t.queue}</b>
            <small>{t.drag}</small>
          </div>
          {tracks
            .filter((x) => x.id !== current.id)
            .map((track, i) => (
              <TrackRow
                key={track.id}
                track={track}
                language={language}
                index={i}
                play={() => play(track.id)}
              />
            ))}
        </aside>
      )}

      {full && (
        <div className="full-player">
          <div
            className="full-bg"
            style={{
              backgroundImage: `url(${current.art || image.hero})`,
            }}
          />
          <header>
            <IconButton label="Close player" onClick={() => setFull(false)}>
              <ChevronDown size={25} />
            </IconButton>
            <span>{t.now}</span>
            <IconButton label="More">
              <MoreHorizontal size={22} />
            </IconButton>
          </header>
          <div className="full-body">
            <div className="full-art">
              <img src={current.art || image.hero} alt="" />
              <span>AHANGBAZAR · LOSSLESS</span>
            </div>
            <div className="full-info">
              <div className="full-title">
                <div>
                  <h1>
                    {language === "fa"
                      ? current.faTitle || current.title
                      : current.title}
                  </h1>
                  <p>
                    {language === "fa"
                      ? current.faArtist || current.artist
                      : current.artist}
                  </p>
                </div>
                <IconButton
                  label="Favorite"
                  active={favorites.includes(current.id)}
                  onClick={() => favorite(current.id)}
                >
                  <Heart
                    size={23}
                    fill={
                      favorites.includes(current.id) ? "currentColor" : "none"
                    }
                  />
                </IconButton>
              </div>

              <div className="timeline">
                <i onClick={seek} style={{ cursor: "pointer" }}>
                  <b style={{ width: `${progress}%` }} />
                </i>
                <p>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </p>
              </div>

              <div className="full-controls">
                <IconButton
                  label="Shuffle"
                  active={shuffle}
                  onClick={() => setShuffle((v) => !v)}
                >
                  <Shuffle size={20} />
                </IconButton>
                <IconButton label="Previous" onClick={playPrev}>
                  <SkipBack size={28} fill="currentColor" />
                </IconButton>
                <button
                  className="full-play"
                  onClick={() => setPlaying((v) => !v)}
                >
                  {playing ? (
                    <Pause size={30} fill="currentColor" />
                  ) : (
                    <Play size={30} fill="currentColor" />
                  )}
                </button>
                <IconButton label="Next" onClick={playNext}>
                  <SkipForward size={28} fill="currentColor" />
                </IconButton>
                <IconButton
                  label="Repeat"
                  active={repeat}
                  onClick={() => setRepeat((v) => !v)}
                >
                  <Repeat2 size={20} />
                </IconButton>
              </div>

              <div className="full-actions">
                <button onClick={() => setQueue(true)}>
                  <ListMusic size={19} />
                  {t.queue}
                </button>
                <button>
                  <Mic2 size={19} />
                  {t.lyrics}
                </button>
                <button onClick={() => setShareFor(current)}>
                  <Share2 size={19} />
                  {language === "fa" ? "اشتراک‌گذاری" : "Share"}
                </button>
                <button
                  onClick={() => downloadTrack(current)}
                  disabled={!current.audioUrl}
                >
                  <Download size={19} />
                  {language === "fa" ? "دانلود" : "Download"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {shareFor && (
        <div className="share-overlay" onClick={() => setShareFor(null)}>
          <div
            className="share-sheet"
            role="dialog"
            aria-label="Share"
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <div>
                <b>{language === "fa" ? "اشتراک‌گذاری" : "Share"}</b>
                <small>{trackLabel(shareFor)}</small>
              </div>
              <IconButton label="Close" onClick={() => setShareFor(null)}>
                <X size={18} />
              </IconButton>
            </header>

            <div className="share-options">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  trackUrl(shareFor),
                )}&text=${encodeURIComponent(trackLabel(shareFor))}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShareFor(null)}
              >
                <span className="share-icon telegram">
                  <Send size={20} />
                </span>
                Telegram
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${trackLabel(shareFor)} ${trackUrl(shareFor)}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShareFor(null)}
              >
                <span className="share-icon whatsapp">
                  <MessageCircle size={20} />
                </span>
                WhatsApp
              </a>

              <button type="button" onClick={() => void copyLink(shareFor)}>
                <span className="share-icon">
                  <Link2 size={20} />
                </span>
                {language === "fa" ? "کپی لینک" : "Copy link"}
              </button>

              {typeof navigator !== "undefined" && "share" in navigator && (
                <button
                  type="button"
                  onClick={() => void nativeShare(shareFor)}
                >
                  <span className="share-icon">
                    <Share2 size={20} />
                  </span>
                  {language === "fa" ? "بیشتر" : "More"}
                </button>
              )}
            </div>

            <div className="share-link">
              <input
                readOnly
                dir="ltr"
                value={trackUrl(shareFor)}
                onFocus={(e) => e.currentTarget.select()}
              />
              <button type="button" onClick={() => void copyLink(shareFor)}>
                {language === "fa" ? "کپی" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
