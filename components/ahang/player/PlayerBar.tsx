"use client";

import {
  Heart,
  ListMusic,
  Maximize2,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { IconButton } from "@/components/ahang/IconButton";
import { image } from "@/data/ahang";
import { usePlayer } from "@/context/PlayerContext";

type Props = {
  onOpenFull: () => void;
  onToggleQueue: () => void;
  queueOpen: boolean;
};

export function PlayerBar({ onOpenFull, onToggleQueue, queueOpen }: Props) {
  const {
    language,
    current,
    playing,
    progress,
    volume,
    muted,
    repeat,
    shuffle,
    favorites,
    togglePlay,
    playPrev,
    playNext,
    seek,
    changeVolume,
    toggleMute,
    setRepeat,
    setShuffle,
    toggleFavorite,
  } = usePlayer();

  if (!current) return null;

  const handleSeek = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  };

  const handleVolume = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    changeVolume((e.clientX - r.left) / r.width, language === "fa");
  };

  return (
    <div className="player">
      <i className="progress" onClick={handleSeek} style={{ cursor: "pointer" }}>
        <b style={{ width: `${progress}%` }} />
      </i>
      <button className="now-playing" type="button" onClick={onOpenFull}>
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
        <button className="play" type="button" onClick={togglePlay}>
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
          onClick={() => toggleFavorite(current.id)}
        >
          <Heart
            size={18}
            fill={favorites.includes(current.id) ? "currentColor" : "none"}
          />
        </IconButton>
        <IconButton label="Queue" active={queueOpen} onClick={onToggleQueue}>
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
            handleVolume(e);
          }}
          onPointerMove={(e) => {
            if (e.buttons === 1) handleVolume(e);
          }}
        />
      </div>
    </div>
  );
}