import { Track } from "@/types/tracksType";

export const getAudioUrl = (track: Track) => {
  if (!track.file_path) return "";
  return `https://qplnrrtqqytmbflqdpnb.supabase.co/storage/v1/object/public/music-files/${track.file_path}`;
};
