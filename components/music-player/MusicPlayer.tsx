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
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Track } from "@/types/tracksType";
import appLogo from "@/public/ahangbazar-logo.png";
import { supabase } from "@/libs/supabase/supabaseClient";
import { downloadTrack } from "@/utils/downloadTrack";

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
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 gap-2">
          {/* Track Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-xl cursor-pointer">
              <img
                src={
                  currentTrack.cover?.trim() ? currentTrack.cover : appLogo.src
                }
                alt={currentTrack.title}
                onError={(e) => (e.currentTarget.src = appLogo.src)}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-white font-semibold text-xs md:text-lg">
                {currentTrack.title}
              </h4>
              <p className="truncate text-gray-400 text-xs md:text-sm">
                {currentTrack.artist}
              </p>
            </div>

            {/* Buttons: Like / Share / Download */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className={`text-gray-400 hover:text-pink-400 rounded-full transition-all duration-300 hover:scale-110`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-10 sm:h-10 ${
                    isLiked ? "fill-pink-400 text-pink-400" : ""
                  }`}
                />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-blue-400 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Share2 className="w-4 h-4 sm:w-10 sm:h-10" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => downloadTrack(currentTrack)}
                className="text-gray-400 hover:text-green-400 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Download className="w-4 h-4 sm:w-10 sm:h-10" />
              </Button>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col sm:flex-row items-center w-72 md:w-auto sm:space-x-6 space-y-3 sm:space-y-0 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
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
                <Shuffle className="w-4 h-4 sm:w-10 sm:h-10" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onNext}
                className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
              >
                <SkipForward className="w-4 h-4 sm:w-10 sm:h-10" />
              </Button>
              <Button
                onClick={onPlayPause}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:scale-110 transition-all duration-300 border border-white/20 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-10 sm:h-10 text-white" />
                ) : (
                  <Play className="w-5 h-5 sm:w-10 sm:h-10 text-white" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onPrevious}
                className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
              >
                <SkipBack className="w-4 h-4 sm:w-10 sm:h-10" />
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
                <Repeat className="w-4 h-4 sm:w-10 sm:h-10" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-96">
              <span className="text-xs sm:text-sm text-gray-400 font-mono">
                {currentTime}
              </span>
              <Slider
                value={progress}
                onValueChange={handleProgressChange}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs sm:text-sm text-gray-400 font-mono">
                {currentTrack.duration}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 sm:space-x-3 mt-2 sm:mt-0 w-74 sm:w-44">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
            >
              <Volume2 className="w-4 h-4 sm:w-10 sm:h-10" />
            </Button>

            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1 sm:w-24"
            />

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-black rounded-full transition-all duration-300 hover:scale-110"
            >
              <MoreHorizontal className="w-4 h-4 sm:w-10 sm:h-10" />
            </Button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </>
  );
}
