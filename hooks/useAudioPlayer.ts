"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "@/types";

type Options = {
  tracks: Track[];
  initialId?: string | null;
};

export function useAudioPlayer({ tracks, initialId = null }: Options) {
  const [playing, setPlaying] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(initialId);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tracksRef = useRef(tracks);
  const currentIdRef = useRef(currentId);
  const repeatRef = useRef(repeat);
  const shuffleRef = useRef(shuffle);

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

  const current =
    tracks.find((t) => t.id === currentId) ?? tracks[0] ?? null;

  const goNext = useCallback(() => {
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
  }, []);

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
  }, [goNext]);

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
      void audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentId, current?.audioUrl, playing]);

  const play = useCallback(
    (id: string) => {
      if (currentId === id) setPlaying((v) => !v);
      else {
        setCurrentId(id);
        setPlaying(true);
      }
    },
    [currentId],
  );

  const togglePlay = useCallback(() => setPlaying((v) => !v), []);

  const playPrev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const list = tracksRef.current;
    const id = currentIdRef.current;
    if (!list.length || !id) return;
    const i = list.findIndex((x) => x.id === id);
    const prev = list[(i - 1 + list.length) % list.length];
    setCurrentId(prev.id);
    setPlaying(true);
  }, []);

  const seek = useCallback(
    (ratio: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const clamped = Math.min(1, Math.max(0, ratio));
      audio.currentTime = clamped * duration;
      setCurrentTime(audio.currentTime);
    },
    [duration],
  );

  const changeVolume = useCallback((ratio: number, isRtl = false) => {
    let r = isRtl ? 1 - ratio : ratio;
    r = Math.min(1, Math.max(0, r));
    setVolume(r);
    setMuted(r === 0);
  }, []);

  const toggleMute = useCallback(() => {
    if (muted || volume === 0) {
      setMuted(false);
      if (volume === 0) setVolume(0.8);
    } else {
      setMuted(true);
    }
  }, [muted, volume]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return {
    playing,
    currentId,
    current,
    currentTime,
    duration,
    volume,
    muted,
    repeat,
    shuffle,
    progress,
    setCurrentId,
    setPlaying,
    setRepeat,
    setShuffle,
    play,
    togglePlay,
    playNext: goNext,
    playPrev,
    seek,
    changeVolume,
    toggleMute,
  };
}