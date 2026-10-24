export type Language = "en" | "fa";
export type View = "home" | "search" | "library";

export type { Track } from "@/lib/tracks";

export const image = {
  hero: "https://images.unsplash.com/photo-1612982663544-54e9d6d2818d?auto=format&fit=crop&w=1600&q=90",
  red: "https://images.unsplash.com/photo-1706821114509-2065d0dd9ff8?auto=format&fit=crop&w=800&q=85",
  mono: "https://images.unsplash.com/photo-1558730234-d8b2281b0d00?auto=format&fit=crop&w=800&q=85",
  man: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?auto=format&fit=crop&w=800&q=85",
  woman:
    "https://images.unsplash.com/photo-1646514336747-2a2e5871ac45?auto=format&fit=crop&w=800&q=85",
  dusk: "https://images.unsplash.com/photo-1647175352373-3529bc57d458?auto=format&fit=crop&w=800&q=85",
  singer:
    "https://images.unsplash.com/photo-1556296569-44d434fb28d6?auto=format&fit=crop&w=800&q=85",
};

export const copy = {
  en: {
    hello: "Good evening",
    intro: "A soundtrack for the hours ahead.",
    search: "Search tracks, artists, albums",
    home: "Discover",
    explore: "Explore",
    library: "Your library",
    trending: "Trending now",
    releases: "New releases",
    artists: "Artists to know",
    genres: "Explore by mood",
    see: "See all",
    exclusive: "AhangBazar exclusive",
    feature: "After the last light",
    body: "A nocturnal selection of Persian pop, quiet electronica, and songs that stay with you.",
    listen: "Listen now",
    save: "Save",
    searchTitle: "Find your next favorite",
    searchBody: "Search across Persian and international music.",
    recent: "Recent searches",
    results: "Top results",
    libraryTitle: "Music, kept close",
    favorites: "Favorite tracks",
    playlists: "Playlists",
    albums: "Albums",
    now: "Now playing",
    queue: "Up next",
    drag: "Drag to reorder",
    curated: "Curated for tonight",
    lyrics: "Lyrics",
  },
  fa: {
    hello: "عصر بخیر",
    intro: "موسیقی برای ساعت‌های پیش رو.",
    search: "جستجوی آهنگ، هنرمند، آلبوم",
    home: "کشف موسیقی",
    explore: "جستجو",
    library: "کتابخانه",
    trending: "محبوب این روزها",
    releases: "تازه‌های موسیقی",
    artists: "هنرمندان منتخب",
    genres: "کشف بر اساس حال‌وهوا",
    see: "مشاهده همه",
    exclusive: "انتخاب ویژه آهنگ‌بازار",
    feature: "پس از آخرین نور",
    body: "منتخبی شبانه از پاپ فارسی، الکترونیک آرام و ترانه‌هایی که با شما می‌مانند.",
    listen: "پخش کنید",
    save: "ذخیره",
    searchTitle: "موسیقی بعدی‌تان را پیدا کنید",
    searchBody: "در میان موسیقی فارسی و بین‌المللی جستجو کنید.",
    recent: "جستجوهای اخیر",
    results: "نتایج برتر",
    libraryTitle: "موسیقی‌های محبوب شما",
    favorites: "آهنگ‌های مورد علاقه",
    playlists: "پلی‌لیست‌ها",
    albums: "آلبوم‌ها",
    now: "در حال پخش",
    queue: "در صف پخش",
    drag: "برای جابه‌جایی بکشید",
    curated: "منتخب امشب",
    lyrics: "متن ترانه",
  },
} as const;

export const artists = [
  ["Roya", "رویا", image.red],
  ["Kian", "کیان", image.mono],
  ["Nava", "نوا", image.woman],
  ["Daal", "دال", image.man],
] as const;

export const genres = [
  ["Persian Pop", "پاپ فارسی", "#624D3B"],
  ["Alternative", "آلترناتیو", "#334A48"],
  ["Persian Rap", "رپ فارسی", "#523C41"],
  ["Electronic", "الکترونیک", "#3A4057"],
  ["Traditional", "سنتی ایرانی", "#5A5135"],
] as const;
