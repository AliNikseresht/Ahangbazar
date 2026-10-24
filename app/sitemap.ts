import type { MetadataRoute } from "next";
import { getAllArtists, getAllTracks } from "@/lib/seo-data";

const siteUrl = "https://ahangbazar.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tracks, artists] = await Promise.all([
    getAllTracks(),
    getAllArtists(),
  ]);
  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    ...artists.map((a) => ({
      url: `${siteUrl}/artist/${a.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...tracks.map((t) => ({
      url: `${siteUrl}/track/${t.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
