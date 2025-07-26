"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { getPublicAudioUrl } from "@/libs/audioUtils";
import {
  Pause,
  Play,
  Repeat,
  Volume2,
  VolumeX,
  ArrowRight,
} from "lucide-react";

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
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const isLoopRef = useRef(isLoop);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationId = useRef<number>(0);

  useEffect(() => {
    isLoopRef.current = isLoop;
  }, [isLoop]);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ffffff50",
      progressColor: "#1db954",
      cursorColor: "#1db954",
      barWidth: 2,
      height: 40,
      normalize: true,
    });

    if (currentSong) {
      const audioUrl = getPublicAudioUrl(currentSong.storage_path);
      setIsLoading(true);
      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on("ready", () => {
        setIsLoading(false);
        setDuration(wavesurfer.current?.getDuration() || 0);
        wavesurfer.current?.setVolume(volume);
        wavesurfer.current?.play();
        setIsPlaying(true);
      });

      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on("finish", () => {
        if (isLoopRef.current) {
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
      cancelAnimationFrame(animationId.current);
    };
  }, [currentSong, onPause, volume]);

  useEffect(() => {
    if (!wavesurfer.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const audio = wavesurfer.current.getMediaElement();
    audioCtxRef.current = new (window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();

    const source = audioCtxRef.current.createMediaElementSource(audio);

    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function draw() {
      animationId.current = requestAnimationFrame(draw);

      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 0.8;
      const totalBarsWidth = bufferLength * (barWidth + 1) - 1;
      let x = (canvas.width - totalBarsWidth) / 1.2;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height / 2);
        const intensity = dataArray[i];
        const hue = 100 + (intensity / 255) * 60;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId.current);
      window.removeEventListener("resize", resizeCanvas);
      audioCtxRef.current?.close();
    };
  }, [currentSong]);

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
    setIsMuted(newVolume === 0);
    if (wavesurfer.current) wavesurfer.current.setVolume(newVolume);
  };

  const toggleMute = () => {
    if (!wavesurfer.current) return;

    if (isMuted) {
      wavesurfer.current.setVolume(volume || 0.8);
      setIsMuted(false);
    } else {
      wavesurfer.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleLoop = () => setIsLoop(!isLoop);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative h-60 lg:h-44 w-full px-3 sm:px-6 py-4 rounded-xl shadow-lg backdrop-blur-lg bg-gradient-to-r from-gray-900/80 via-green-900/70 to-gray-900/80 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl"
      />

      {currentSong ? (
        <>
          <p className="mb-3 text-center text-sm sm:text-base text-gray-200 font-semibold relative z-10">
            {isLoading ? "در حال بارگذاری..." : currentSong.title}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center relative z-10">
            <div className="flex gap-3 items-center flex-shrink-0">
              <button
                onClick={handlePlayPause}
                className="p-3 bg-green-500 rounded-full hover:bg-green-600 transition shadow-md cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-gray-300" />
                ) : (
                  <Play size={20} className="text-gray-300" />
                )}
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition shadow-md cursor-pointer"
              >
                <ArrowRight size={20} className="text-gray-300" />
              </button>
              <button
                onClick={toggleLoop}
                className={`p-3 rounded-full cursor-pointer ${
                  isLoop ? "bg-green-500" : "bg-gray-700"
                } hover:opacity-80 shadow-md`}
              >
                <Repeat size={20} className="text-gray-300" />
              </button>
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
  );
};

export default AudioPlayer;
