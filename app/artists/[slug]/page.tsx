import { notFound } from "next/navigation";
import { supabase } from "@/libs/supabase/supabaseClient";
import ArtistSongs from "@/components/ui/ArtistSongs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistPage(props: Props) {
  const { slug } = await props.params;

  const { data: artist, error } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !artist) {
    return notFound();
  }

  const { data: songs } = await supabase
    .from("songs")
    .select("*")
    .eq("artist_id", artist.id);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {artist.name_fa || artist.name}
      </h1>
      {artist.bio && <p className="mb-6 text-gray-700">{artist.bio}</p>}

      <ArtistSongs songs={songs || []} />
    </div>
  );
}
