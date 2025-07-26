import { supabase } from "@/libs/supabase/supabaseClient";
import { NextResponse } from "next/server";

interface SongRecord {
  title: string;
  storage_path: string;
  genre: string | null;
  release_date: string | null;
  artist_id: string | null;
  album: string | null;
}

async function syncSongs() {
  const { data: files, error: filesError } = await supabase.storage
    .from("music-files")
    .list("", { limit: 1000 });

  if (filesError || !files) {
    throw new Error("Failed to list files: " + filesError?.message);
  }

  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("storage_path");

  if (songsError || !songs) {
    throw new Error("Failed to fetch songs from table: " + songsError?.message);
  }

  const existingPaths = new Set(songs.map((s) => s.storage_path));

  const newFiles = files.filter((file) => !existingPaths.has(file.name));

  if (newFiles.length === 0) {
    return "No new files to add";
  }

  const newRecords: SongRecord[] = newFiles.map((file) => ({
    title: file.name.replace(/\.[^/.]+$/, ""),
    storage_path: file.name,
    genre: null,
    release_date: new Date().toISOString().slice(0, 10),
    artist_id: null,
    album: null,
  }));

  const { error: insertError } = await supabase
    .from("songs")
    .insert(newRecords);

  if (insertError) {
    throw new Error("Failed to insert new songs: " + insertError.message);
  }

  return `Added ${newRecords.length} new songs`;
}

export async function GET() {
  try {
    const message = await syncSongs();
    return NextResponse.json({ status: "success", message });
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
