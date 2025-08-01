import { SuggestedSong } from "@/types/suggestedSong";

export async function getSongById(id: string): Promise<SuggestedSong | null> {
  const res = await fetch(
    `https://qplnrrtqqytmbflqdpnb.supabase.co/rest/v1/suggested_songs?id=eq.${id}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();
  return data[0] || null;
}