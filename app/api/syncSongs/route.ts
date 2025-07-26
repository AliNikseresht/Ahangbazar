import { supabase } from "@/libs/supabase/supabaseClient";

interface FileItem {
  name: string;
  isFolder: boolean;
}

async function listAllFiles(path = ""): Promise<FileItem[]> {
  type SupabaseFileItem = { name: string; id?: string };

  const { data, error } = (await supabase.storage
    .from("music-files")
    .list(path, { limit: 1000 })) as {
    data: SupabaseFileItem[] | null;
    error: any;
  };
  if (error) throw error;

  let files: FileItem[] = [];

  for (const item of data || []) {
    const isFolder = !("id" in item);
    if (isFolder) {
      const nestedFiles = await listAllFiles(path + item.name + "/");
      files = files.concat(nestedFiles);
    } else {
      files.push({ name: path + item.name, isFolder: false });
    }
  }

  return files;
}

async function syncSongs() {
  const files = await listAllFiles();

  const { data: songs, error: songsError } = await supabase
    .from("songs")
    .select("storage_path");
  if (songsError || !songs)
    throw new Error(songsError?.message || "Failed to get songs");

  const existingPaths = new Set(
    songs.map((s) =>
      s.storage_path.startsWith("music-files/")
        ? s.storage_path
        : "music-files/" + s.storage_path
    )
  );

  const newFiles = files.filter((file) => {
    const fullName = file.name.startsWith("music-files/")
      ? file.name
      : "music-files/" + file.name;
    return !file.isFolder && !existingPaths.has(fullName);
  });

  console.log("Files from storage:", files);
  console.log("Existing paths in DB:", [...existingPaths]);
  console.log("New files to add:", newFiles);

  if (newFiles.length === 0) return "No new files to add";

  const newRecords = newFiles.map((file) => {
    const fullName = file.name.startsWith("music-files/")
      ? file.name
      : "music-files/" + file.name;

    const fileName = file.name.split("/").pop() || "Unknown";
    const title = fileName.replace(/\.[^/.]+$/, "");
    const pathParts = file.name.split("/");
    const album = pathParts.length > 1 ? pathParts[pathParts.length - 2] : null;
    const cover_image_url = album
      ? `music-files/${pathParts
          .slice(0, pathParts.length - 1)
          .join("/")}/${album}.jpg`
      : null;

    return {
      title,
      artist_id: null,
      album,
      genre: null,
      release_date: null,
      storage_path: fullName,
      duration: null,
      cover_image_url,
    };
  });

  const { error: insertError } = await supabase
    .from("songs")
    .insert(newRecords);
  if (insertError) throw new Error(insertError.message);

  return `Added ${newRecords.length} new songs`;
}

export async function GET() {
  try {
    const message = await syncSongs();
    return new Response(
      JSON.stringify({
        status: "success",
        message,
        // اضافه برای دیباگ
        files: await listAllFiles(),
        songsPaths: (await supabase.from("songs").select("storage_path")).data,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
