import { cacheLife } from "next/cache";
import { getArtists } from "@/lib/artists";
import { getCategories } from "@/lib/categories";
import { enrichTracks } from "@/lib/enrich";
import { getTracks } from "@/lib/tracks";
import HomeClient from "@/components/layout/home-client";

export default async function Page() {
  "use cache";
  // Cache this page's data for 300s (5 min) so Supabase is not queried on every
  // request. After expiry, the next visit triggers a background refresh.
  cacheLife({ stale: 300, revalidate: 300, expire: 86400 });

  const [tracks, artists, categories] = await Promise.all([
    getTracks(),
    getArtists(),
    getCategories(),
  ]);

  return (
    <HomeClient
      initialTracks={enrichTracks(tracks, artists)}
      initialArtists={artists}
      initialCategories={categories}
    />
  );
}