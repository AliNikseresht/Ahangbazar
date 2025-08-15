import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Share2,
  Download,
  Repeat,
  Shuffle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";
import { supabase } from "@/libs/supabase/supabaseClient";
import { toast } from "sonner";

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState([75]);
  const [previousVolume, setPreviousVolume] = useState(75);
  const [progress, setProgress] = useState([0]);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Update audio src only when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.audio) {
      audio.src = currentTrack.audio || "";
      audio.currentTime = 0;
    }

    if (isPlaying) {
      audio.play().catch((err) => console.log("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  // Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  // Progress & time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const percent = (audio.currentTime / (audio.duration || 1)) * 100;
      setProgress([percent]);

      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0");
      setCurrentTime(`${minutes}:${seconds}`);
    };

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch((err) => console.log(err));
      } else if (isShuffle) {
        onNext(); // shuffle handled in parent
      } else {
        onNext();
      }
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, isShuffle, onNext]);

  const handleProgressChange = (value: number[]) => {
    setProgress(value);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration;
    }
  };

  const handleDownload = async () => {
    if (!currentTrack?.audio) {
      toast("فایل دانلود ندارد");
      return;
    }

    try {
      const response = await fetch(currentTrack.audio);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentTrack.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast("دانلود انجام نشد");
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      setVolume([previousVolume]);
    } else {
      setPreviousVolume(volume[0]);
      setVolume([0]);
    }
    setIsMuted(!isMuted);
  };

  const toggleFavorite = async () => {
    if (!currentTrack) return;

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    const currentFavorites = currentTrack.favorites ?? 0;

    try {
      const { error } = await supabase
        .from("songs")
        .update({
          favorites: newLikedState
            ? currentFavorites + 1
            : Math.max(currentFavorites - 1, 0),
        })
        .eq("id", currentTrack.id);

      if (error) {
        console.error("Failed to update favorite:", error);
        setIsLiked(!newLikedState); // rollback on error
      } else {
        currentTrack.favorites = newLikedState
          ? currentFavorites + 1
          : Math.max(currentFavorites - 1, 0);
      }
    } catch (err) {
      console.error(err);
      setIsLiked(!newLikedState); // rollback on error
    }
  };

  useEffect(() => {
    if (!currentTrack) return;

    setIsLiked(currentTrack.favorites > 0);
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <>
      {/* Compact Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div
                className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                onClick={() => setShowFullPlayer(true)}
              >
                <img
                  src={
                    currentTrack.cover && currentTrack.cover.trim()
                      ? currentTrack.cover
                      : appLogo.src
                  }
                  alt={currentTrack.title}
                  onError={(e) => {
                    e.currentTarget.src = appLogo.src;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-white font-semibold text-lg">
                  {currentTrack.title}
                </h4>
                <p className="text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
              {/* share - like - download button */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFavorite}
                  className={`text-gray-400 hover:text-pink-400 rounded-full transition-all duration-300 hover:scale-110`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-pink-400 text-pink-400" : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-blue-400 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-green-400 rounded-full transition-all duration-300 hover:scale-110"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex flex-col items-center space-y-3 px-8">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`rounded-full transition-all duration-300 hover:scale-110 ${
                    isShuffle
                      ? "text-purple-400"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  <Shuffle className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNext}
                  className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
                >
                  <SkipForward className="w-6 h-6" />
                </Button>
                <Button
                  onClick={onPlayPause}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 border border-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-0.5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrevious}
                  className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
                >
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`rounded-full transition-all duration-300 hover:scale-110 ${
                    isRepeat
                      ? "text-purple-400"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  <Repeat className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center space-x-3 w-96">
                <span className="text-sm text-gray-400 font-mono">
                  {currentTime}
                </span>
                <div className="flex-1 group">
                  <Slider
                    value={progress}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-gray-400 font-mono">
                  {currentTrack.duration}
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3 min-w-40">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-gray-400 hover:text-black rounded-full"
              >
                <Volume2 className="w-5 h-5" />
              </Button>

              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-black rounded-full"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Player */}
      {showFullPlayer && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${currentTrack.cover})`,
              filter: "blur(50px)",
              transform: "scale(1.1)",
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <Button
            onClick={() => setShowFullPlayer(false)}
            variant="ghost"
            className="absolute top-8 right-8 text-black hover:bg-white/10 rounded-full w-12 h-12 z-10"
          >
            ✕
          </Button>

          <div className="relative z-10 text-center space-y-12 max-w-2xl mx-auto px-8">
            <div className="relative mx-auto w-80 h-80">
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={
                    currentTrack.cover && currentTrack.cover.trim()
                      ? currentTrack.cover
                      : appLogo.src
                  }
                  alt={currentTrack.title}
                  onError={(e) => {
                    e.currentTarget.src = appLogo.src;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black text-white">
                {currentTrack.title}
              </h1>
              <p className="text-xl text-gray-300">{currentTrack.artist}</p>
            </div>

            <div className="space-y-4">
              <Slider
                value={progress}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-gray-400 font-mono">
                <span>{currentTime}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8">
              <Button
                variant="ghost"
                onClick={() => setIsShuffle(!isShuffle)}
                className={`rounded-full w-12 h-12 transition-all duration-300 ${
                  isShuffle
                    ? "text-purple-400 bg-purple-400/20"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Shuffle className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                onClick={onPrevious}
                className="text-white hover:bg-white/10 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110"
              >
                <SkipBack className="w-8 h-8" />
              </Button>
              <Button
                onClick={onPlayPause}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:scale-110 transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </Button>
              <Button
                variant="ghost"
                onClick={onNext}
                className="text-white hover:bg-white/10 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110"
              >
                <SkipForward className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsRepeat(!isRepeat)}
                className={`rounded-full w-12 h-12 transition-all duration-300 ${
                  isRepeat
                    ? "text-purple-400 bg-purple-400/20"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Repeat className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className={`text-gray-400 hover:text-pink-400 rounded-full transition-all duration-300 hover:scale-110`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "fill-pink-400 text-pink-400" : ""
                  }`}
                />
              </Button>

              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 transition-all duration-300 hover:scale-110"
              >
                <Share2 className="w-6 h-6" />
              </Button>
              <Button
                onClick={handleDownload}
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 transition-all duration-300 hover:scale-110"
              >
                <Download className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
      <audio ref={audioRef} />
    </>
  );
}
