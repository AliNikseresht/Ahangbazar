"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { getPublicAudioUrl } from "@/libs/audioUtils";
import { ArrowRight, Pause, Play, Repeat, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  currentSong: {
    title: string;
    storage_path: string;
  } | null;
  onPause: () => void;
  songsList: { title: string; storage_path: string }[];
  onNextSong: (nextSong: { title: string; storage_path: string }) => void;
}

const AudioPlayer = ({
  currentSong,
  onPause,
  songsList,
  onNextSong,
}: AudioPlayerProps) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1d5db",
      progressColor: "#08aadb",
      cursorColor: "#333",
      barWidth: 2,
      height: 35,
      normalize: true,
    });

    if (currentSong) {
      const audioUrl = getPublicAudioUrl(currentSong.storage_path);
      setIsLoading(true);
      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on("ready", () => {
        setIsLoading(false);
        setDuration(wavesurfer.current?.getDuration() || 0);
        wavesurfer.current?.play();
        setIsPlaying(true);
      });

      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on("finish", () => {
        if (isLoop) {
          wavesurfer.current?.play();
        } else {
          setIsPlaying(false);
          onPause();
        }
      });
    }

    return () => {
      wavesurfer.current?.destroy();
      setIsPlaying(false);
      setIsLoading(false);
    };
  }, [currentSong, onPause, isLoop]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (songsList.length > 0 && currentSong) {
      const currentIndex = songsList.findIndex(
        (song) => song.storage_path === currentSong.storage_path
      );
      const nextIndex = (currentIndex + 1) % songsList.length;
      onNextSong(songsList[nextIndex]);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) wavesurfer.current.setVolume(newVolume);
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center border-b border-gray-300 pb-2">
      {currentSong ? (
        <>
          <p className="mb-2 text-gray-700">
            {isLoading
              ? "در حال بارگذاری آهنگ..."
              : `در حال پخش: ${currentSong.title} `}
          </p>
          <div
            className={`w-full mb-3 relative ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-[#08aadb] rounded-full animate-spin"></div>
              </div>
            )}
            <div className="flex items-center gap-3 justify-between">
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1.5"
                />
                <Volume2 />

                <button onClick={toggleLoop} className="cursor-pointer">
                  {isLoop ? (
                    <Repeat
                      size={24}
                      className={`p-1 rounded ${
                        isLoop ? "bg-green-500" : "bg-gray-500"
                      } text-white hover:${
                        isLoop ? "bg-green-600" : "bg-gray-600"
                      }`}
                    />
                  ) : (
                    <Repeat
                      size={24}
                      className={`p-1 rounded ${
                        isLoop ? "bg-green-500" : "bg-gray-500"
                      } text-white hover:${
                        isLoop ? "bg-green-600" : "bg-gray-600"
                      }`}
                    />
                  )}
                </button>
              </div>
              <div
                ref={waveformRef}
                className="w-full max-w-3xl cursor-pointer"
              ></div>
              <div className="flex items-center gap-2">
                <p className="pt-1">
                  {formatTime(currentTime)} - {formatTime(duration)}
                </p>
                <button
                  onClick={handleNext}
                  className="p-1 rounded bg-gray-500 text-white cursor-pointer"
                >
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-1 rounded bg-gray-500 text-white cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Placeholder */}
          <div className="flex items-center gap-3 justify-between w-full mb-3">
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5"
              />
              <Volume2 />
              <button onClick={toggleLoop} className="cursor-pointer">
                <Repeat
                  size={24}
                  className={`p-1 rounded ${
                    isLoop ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                />
              </button>
            </div>
            <div className="w-full max-w-3xl h-[35px] flex items-center">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 80"
                preserveAspectRatio="none"
              >
                {Array.from({ length: 300 }, (_, index) => {
                  const height = Math.floor(Math.random() * 60) + 10;
                  return (
                    <rect
                      key={index}
                      x={index * 4}
                      y={80 - height}
                      width="2"
                      height={height}
                      fill="#d1d5db"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <p className="pt-1">0:00 - 0:00</p>
              <button
                onClick={handleNext}
                className="p-1 rounded bg-gray-500 text-white cursor-pointer"
              >
                <ArrowRight size={16} />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-1 rounded bg-gray-500 text-white cursor-pointer"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
