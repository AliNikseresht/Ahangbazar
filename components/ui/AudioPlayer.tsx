"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  Pause,
  Play,
  Repeat,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";
import { useAudioVisualizerLogic } from "@/hooks/useAudioVisualizerLogic";
import { formatTime } from "@/utils/formatTime";
import { useWaveSurferLogic } from "@/hooks/useWaveSurferLogic";

interface AudioPlayerProps {
  currentSong: { title: string; storage_path: string } | null;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  const { waveformRef, wavesurfer } = useWaveSurferLogic(
    currentSong,
    volume,
    isLoop,
    onPause,
    setIsPlaying,
    setIsLoading,
    setDuration,
    setCurrentTime
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useAudioVisualizerLogic(wavesurfer, canvasRef, currentSong);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  }, [wavesurfer, isPlaying]);

  const handleNext = useCallback(() => {
    if (songsList.length > 0 && currentSong) {
      const currentIndex = songsList.findIndex(
        (song) => song.storage_path === currentSong.storage_path
      );
      const nextIndex = (currentIndex + 1) % songsList.length;
      onNextSong(songsList[nextIndex]);
    }
  }, [currentSong, songsList, onNextSong]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      if (wavesurfer.current) wavesurfer.current.setVolume(newVolume);
    },
    [wavesurfer]
  );

  const toggleMute = useCallback(() => {
    if (!wavesurfer.current) return;
    if (isMuted) {
      wavesurfer.current.setVolume(volume || 0.8);
      setIsMuted(false);
    } else {
      wavesurfer.current.setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, wavesurfer]);

  const toggleLoop = useCallback(() => setIsLoop(!isLoop), [isLoop]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="relative h-40 lg:h-36 w-full px-2 sm:px-3.5 py-4 rounded-t-xl shadow-lg backdrop-blur-lg bg-gradient-to-r from-gray-900/40 via-green-900/35 to-gray-900/40 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-t-xl"
        />

        {currentSong ? (
          <>
            <p className="hidden lg:flex justify-center text-sm sm:text-base text-gray-200 font-semibold relative z-10">
              {isLoading ? "در حال بارگذاری..." : currentSong.title}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-center relative z-10">
              <div className="flex gap-2 items-center flex-shrink-0">
                <button
                  onClick={handlePlayPause}
                  className="p-1.5 lg:p-3 bg-green-500 rounded-full hover:bg-green-600 transition shadow-md cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-gray-300" />
                  ) : (
                    <Play size={20} className="text-gray-300" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 lg:p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition shadow-md cursor-pointer"
                >
                  <ArrowRight size={20} className="text-gray-300" />
                </button>
                <button
                  onClick={toggleLoop}
                  className={`p-1.5 lg:p-3 rounded-full cursor-pointer ${
                    isLoop ? "bg-green-500" : "bg-gray-700"
                  } hover:opacity-80 shadow-md`}
                >
                  <Repeat size={20} className="text-gray-300" />
                </button>
                <p className="lg:hidden text-center text-xs sm:text-base text-gray-200 font-semibold relative z-10">
                  {isLoading ? "در حال بارگذاری..." : currentSong.title}
                </p>
              </div>

              <div
                ref={waveformRef}
                className="w-full max-w-full sm:max-w-xl md:max-w-2xl cursor-pointer relative"
              ></div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-xs sm:text-sm text-gray-300">
                  {formatTime(duration)} - {formatTime(currentTime)}
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 accent-green-500 cursor-pointer"
                  />
                  <button onClick={toggleMute} className="cursor-pointer">
                    {isMuted ? (
                      <VolumeX size={21} className="text-gray-300" />
                    ) : (
                      <Volume2 size={21} className="text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center relative z-10">
            <div className="flex gap-3 items-center flex-shrink-0">
              <button className="p-3 bg-gray-700 rounded-full opacity-50 cursor-not-allowed">
                <Play size={20} className="text-gray-400" />
              </button>
              <button className="p-3 bg-gray-700 rounded-full opacity-50 cursor-not-allowed">
                <ArrowRight size={20} className="text-gray-400" />
              </button>
              <button className="p-3 bg-gray-700 rounded-full opacity-50 cursor-not-allowed">
                <Repeat size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl h-[40px] flex items-center rounded-lg overflow-hidden">
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
                      fill="#ffffff50"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <p className="text-xs sm:text-sm text-gray-400">0:00 - 0:00</p>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={0}
                  readOnly
                  className="w-16 sm:w-20 accent-gray-500 cursor-not-allowed"
                />
                <Volume2 size={21} className="text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
