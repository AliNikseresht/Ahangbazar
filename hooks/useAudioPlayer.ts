import { useState, useEffect, useRef, useCallback } from "react";
import { Track } from "@/types/tracksType";

export function useAudioPlayer(track?: Track, isPlaying?: boolean, onNext?: () => void) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(75);

  // Update audio src
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.src !== track.audio) {
      audio.src = track.audio || "";
      audio.currentTime = 0;
    }
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [track, isPlaying]);

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Progress & time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const percent = (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress(percent);

      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0");
      setCurrentTime(`${minutes}:${seconds}`);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else if (isShuffle) {
        onNext?.();
      } else {
        onNext?.();
      }
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, isShuffle, onNext]);

  const toggleMute = useCallback(() => {
    if (isMuted) setVolume(previousVolume);
    else {
      setPreviousVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  }, [isMuted, volume, previousVolume]);

  return {
    audioRef,
    volume,
    setVolume,
    progress,
    setProgress,
    currentTime,
    isRepeat,
    setIsRepeat,
    isShuffle,
    setIsShuffle,
    isMuted,
    toggleMute,
  };
}
