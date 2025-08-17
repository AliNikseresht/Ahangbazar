import React, { useCallback } from "react";
import { Track } from "@/types/tracksType";
import {
  TrackInfo,
  MusicControls,
  VolumeSlider,
  ProgressSlider,
  useAudioPlayer,
} from "@/components/music-player";

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
  const {
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
  } = useAudioPlayer(currentTrack, isPlaying, onNext);

  const handleProgressChange = useCallback(
    (value: number) => {
      setProgress(value);
      if (audioRef.current?.duration) {
        audioRef.current.currentTime =
          (value / 100) * audioRef.current.duration;
      }
    },
    [audioRef, setProgress]
  );

  if (!currentTrack) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 gap-2">
          <TrackInfo track={currentTrack} />
          <div className="flex flex-col sm:flex-row items-center w-72 md:w-auto sm:space-x-6 space-y-3 sm:space-y-0 mt-2 sm:mt-0">
            <MusicControls
              isPlaying={isPlaying}
              onPlayPause={onPlayPause}
              onNext={onNext}
              onPrevious={onPrevious}
              isRepeat={isRepeat}
              toggleRepeat={() => setIsRepeat((prev) => !prev)}
              isShuffle={isShuffle}
              toggleShuffle={() => setIsShuffle((prev) => !prev)}
            />

            <ProgressSlider
              progress={progress}
              onChange={handleProgressChange}
              currentTime={currentTime}
              duration={currentTrack.duration}
            />
          </div>
          <VolumeSlider
            volume={volume}
            onVolumeChange={setVolume}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={currentTrack.audio}
        autoPlay={isPlaying}
        onEnded={onNext}
      />
    </>
  );
}
