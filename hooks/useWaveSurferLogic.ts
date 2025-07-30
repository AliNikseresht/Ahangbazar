import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { getPublicAudioUrl } from "@/utils/audioUtils";

export const useWaveSurferLogic = (
  currentSong: { title: string; storage_path: string } | null,
  volume: number,
  isLoop: boolean,
  onPause: () => void,
  setIsPlaying: (playing: boolean) => void,
  setIsLoading: (loading: boolean) => void,
  setDuration: (duration: number) => void,
  setCurrentTime: (time: number) => void
) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const isLoopRef = useRef(isLoop);

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
    };
  }, [currentSong]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  }, [volume]);

  return { waveformRef, wavesurfer };
};
