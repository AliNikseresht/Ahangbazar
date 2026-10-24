import { supabase } from "./supabase";

export type Category = {
  id: string;
  name: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("getCategories error:", error);
    return [];
  }

  return data ?? [];
}