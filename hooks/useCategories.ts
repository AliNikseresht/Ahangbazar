import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase/supabaseClient";
import { Category } from "@/types/categoryType";
import { Zap, Star, Flame, Music, Radio, Disc3 } from "lucide-react";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select(`id, name`)
        .limit(6);

      const icons = [Zap, Star, Flame, Music, Radio, Disc3];
      const colors = [
        "from-cyan-500 to-blue-600",
        "from-pink-500 to-rose-600",
        "from-red-500 to-orange-600",
        "from-purple-500 to-indigo-600",
        "from-yellow-500 to-amber-600",
        "from-green-500 to-emerald-600",
      ];

      return (
        data?.map((cat, i) => ({
          ...cat,
          icon: icons[i] || Music,
          color: colors[i] || "from-gray-500 to-gray-700",
          tracks: 0,
          description: "",
        })) || []
      );
    },
  });
}
