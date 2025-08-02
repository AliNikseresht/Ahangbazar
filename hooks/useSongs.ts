"use client";

import { supabase } from "@/libs/supabase/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export function useSongs(album?: string) {
  return useQuery({
    queryKey: ["songs", album],
    queryFn: async () => {
      let query = supabase
        .from("songs")
        .select(
          `
          *,
          artist:artists (
            id,
            name,
            name_fa
          )
        `
        )
        .order("created_at", { ascending: false });

      if (album) query = query.eq("album", album);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
