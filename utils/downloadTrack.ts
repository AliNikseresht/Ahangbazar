import { toast } from "sonner";

type Track = {
  title: string;
  audio?: string;
};

export const downloadTrack = async (track?: Track) => {
  if (!track?.audio) {
    toast("فایل دانلود ندارد");
    return;
  }

  try {
    const response = await fetch(track.audio);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    toast("دانلود انجام نشد");
  }
};
