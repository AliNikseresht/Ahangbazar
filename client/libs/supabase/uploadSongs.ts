import { supabase } from "./supabaseClient";

async function syncArtistsAlbumsSongs() {
  const bucketName = "music-files";

  const { data: artistFolders, error: artistError } = await supabase.storage
    .from(bucketName)
    .list("", { limit: 100 });

  if (artistError) {
    console.error("Error fetching artist folders:", artistError);
    return;
  }

  for (const artistFolder of artistFolders) {
    if (!artistFolder.name) continue;
    const artistName = artistFolder.name.replace(/-/g, " ");

    let { data: artistData } = await supabase
      .from("artists")
      .select("*")
      .eq("name", artistName)
      .limit(1)
      .single();

    if (!artistData) {
      const defaultCover = `${bucketName}/${artistFolder.name}/cover.png`;

      const { data: insertedArtist, error: insertArtistErr } = await supabase
        .from("artists")
        .insert([{ name: artistName, photo_url: defaultCover }])
        .select()
        .single();

      if (insertArtistErr) {
        console.error("Insert artist error:", insertArtistErr);
        continue;
      }
      artistData = insertedArtist;
    }

    const { data: albumOrSingleFolders, error: subFolderError } =
      await supabase.storage
        .from(bucketName)
        .list(artistFolder.name, { limit: 100 });

    if (subFolderError) {
      console.error("Error fetching albums/singles folders:", subFolderError);
      continue;
    }

    for (const categoryFolder of albumOrSingleFolders) {
      if (!categoryFolder.name) continue;
      const { data: albumsOrSingles, error: albumListError } =
        await supabase.storage
          .from(bucketName)
          .list(`${artistFolder.name}/${categoryFolder.name}`, { limit: 100 });

      if (albumListError) {
        console.error("Error fetching albums/singles list:", albumListError);
        continue;
      }

      for (const albumFolder of albumsOrSingles) {
        if (!albumFolder.name) continue;

        const albumPath = `${artistFolder.name}/${categoryFolder.name}/${albumFolder.name}`;

        const { data: files, error: filesError } = await supabase.storage
          .from(bucketName)
          .list(albumPath, { limit: 100 });

        if (filesError) {
          console.error("Error fetching files:", filesError);
          continue;
        }

        const musicFiles = files.filter((f) => f.name.endsWith(".mp3"));

        const coverFile = files.find(
          (f) =>
            !f.name.endsWith(".mp3") &&
            (f.name.endsWith(".png") || f.name.endsWith(".jpg"))
        );

        const coverImageUrl = coverFile
          ? `${bucketName}/${albumPath}/${coverFile.name}`
          : artistData.photo_url;

        for (const musicFile of musicFiles) {
          const title = musicFile.name
            .replace(/\.mp3$/, "")
            .replace(/^\d+\s*/, "");

          const { data: existingSong } = await supabase
            .from("songs")
            .select("*")
            .eq("title", title)
            .eq("artist_id", artistData.id)
            .limit(1)
            .single();

          if (existingSong) continue;

          const storagePath = `${bucketName}/${albumPath}/${musicFile.name}`;

          const { error: insertSongError } = await supabase
            .from("songs")
            .insert([
              {
                title,
                artist_id: artistData.id,
                album: albumFolder.name,
                storage_path: storagePath,
                cover_image_url: coverImageUrl,
              },
            ]);

          if (insertSongError) {
            console.error("Insert song error:", insertSongError);
          }
        }
      }
    }
  }
}

syncArtistsAlbumsSongs();
