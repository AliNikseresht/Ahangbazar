export interface SupabaseTrack {
  id: string;
  title: string;
  duration: string | null;
  cover_url: string | null;
  file_path: string | null;
  artists?: { name: string } | { name: string }[];
  plays?: number | null;
  favorites?: number | null;
}