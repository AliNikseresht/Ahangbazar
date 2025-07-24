"use client";

import { supabase } from "@/libs/supabase/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export function useSongs(album: string) {
  return useQuery({
    queryKey: ["songs", album],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("album", album)
        .order("title", { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
  });
}
