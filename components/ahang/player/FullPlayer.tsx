"use client";

import {
  ChevronDown,
  Download,
  Heart,
  ListMusic,
  Mic2,
  MoreHorizontal,
  Pause,
  Play,
  Repeat2,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { IconButton } from "@/components/ahang/IconButton";
import { copy, image } from "@/data/ahang";
import { formatTime } from "@/lib/music/ui-utils";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  onClose: () => void;
  onOpenQueue: () => void;
  onShare: () => void;
  onDownload: () => void;
};

export function FullPlayer({
  onClose,
  onOpenQueue,
  onShare,
  onDownload,
}: Props) {
  const {
    language,
    current,
    playing,
    currentTime,
    duration,
    progress,
    repeat,
    shuffle,
    favorites,
    togglePlay,
    playPrev,
    playNext,
    seek,
    setRepeat,
    setShuffle,
    toggleFavorite,
  } = usePlayer();
  const t = copy[language];

  if (!current) return null;

  const handleSeek = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  };

  return (
    <div className="full-player">
      <div
        className="full-bg"
        style={{
          backgroundImage: `url(${current.art || image.hero})`,
        }}
      />
      <header>
        <IconButton label="Close player" onClick={onClose}>
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
              onClick={() => toggleFavorite(current.id)}
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
            <i onClick={handleSeek} style={{ cursor: "pointer" }}>
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
            <button className="full-play" type="button" onClick={togglePlay}>
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
            <button type="button" onClick={onOpenQueue}>
              <ListMusic size={19} />
              {t.queue}
            </button>
            <button type="button">
              <Mic2 size={19} />
              {t.lyrics}
            </button>
            <button type="button" onClick={onShare}>
              <Share2 size={19} />
              {language === "fa" ? "اشتراک‌گذاری" : "Share"}
            </button>
            <button
              type="button"
              onClick={onDownload}
              disabled={!current.audioUrl}
            >
              <Download size={19} />
              {language === "fa" ? "دانلود" : "Download"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}