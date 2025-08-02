type Artist = {
  id: string;
  name: string;
  name_fa: string;
};

export type Song = {
  id: string;
  title: string;
  persian_title?: string;
  artist_id: string;
  artist?: Artist;
  album: string;
  storage_path: string;
  cover_image_url?: string;
};
