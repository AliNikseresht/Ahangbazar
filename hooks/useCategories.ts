import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Category } from "@/types/categoryType";
import { Zap, Star, Flame, Music, Radio, Disc3 } from "lucide-react";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: categories } = await supabase
        .from("categories")
        .select(`id, name`)
        .limit(6);

      if (!categories) return [];

      const categoriesWithTracks = await Promise.all(
        categories.map(async (cat) => {
          const { count } = await supabase
            .from("songs")
            .select("*", { count: "exact", head: true })
            .eq("category_id", cat.id);

          const icons = [Zap, Star, Flame, Music, Radio, Disc3];
          const colors = [
            "from-cyan-500 to-blue-600",
            "from-pink-500 to-rose-600",
            "from-red-500 to-orange-600",
            "from-purple-500 to-indigo-600",
            "from-yellow-500 to-amber-600",
            "from-green-500 to-emerald-600",
          ];

          return {
            ...cat,
            icon: icons[categories.indexOf(cat)] || Music,
            color:
              colors[categories.indexOf(cat)] || "from-gray-500 to-gray-700",
            tracks: count || 0,
            description: "",
          };
        })
      );

      return categoriesWithTracks;
    },
  });
}
