  "use client";

  import { useState, useEffect } from "react";

  type Song = {
    id: number;
    title: string;
    artist: string;
    album: string;
  };

  const dummySongs: Song[] = [
    { id: 1, title: "بی‌تو", artist: "محسن یگانه", album: "نفس‌های بی‌تو" },
    { id: 2, title: "چشمای تو", artist: "محسن چاوشی", album: "سنتوری" },
    { id: 3, title: "عاشق شدم", artist: "مجید یحیایی", album: "خاطره‌ها" },
    { id: 4, title: "دلگیرم", artist: "معین زد", album: "بی‌نام" },
    { id: 5, title: "پرواز", artist: "احسان خواجه‌امیری", album: "سلام آخر" },
    { id: 6, title: "دیوونه", artist: "سیروان خسروی", album: "جاده رؤیاها" },
  ];

  export default function InteractiveSearchBox() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!searchTerm.trim()) {
          setFilteredSongs([]);
          return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = dummySongs.filter(
          (song) =>
            song.title.toLowerCase().includes(term) ||
            song.artist.toLowerCase().includes(term) ||
            song.album.toLowerCase().includes(term)
        );

        setFilteredSongs(filtered);
      }, 300); // debounce

      return () => clearTimeout(timeout);
    }, [searchTerm]);

    return (
      <div className="w-full max-w-xl relative">
        <input
          type="text"
          placeholder="جستجو موسیقی, هنرمند, آلبوم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 border text-gray-500 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-[#08aadb]"
        />

        {searchTerm && (
          <ul className="space-y-2 absolute top-15 border border-gray-300 rounded-lg p-2 w-full max-w-xl">
            {filteredSongs.length === 0 ? (
              <li className="text-gray-500 text-center text-sm">
                موردی یافت نشد
              </li>
            ) : (
              filteredSongs.map((song, index) => {
                const isLast = index === filteredSongs.length - 1;
                return (
                  <li
                    key={song.id}
                    className={`hover:bg-gray-50 transition p-1 cursor-pointer rounded-se-lg ${
                      !isLast ? "border-b border-gray-300" : ""
                    }`}
                  >
                    <div>{song.title}</div>
                    <div className="text-sm text-gray-600">
                      {song.artist} - {song.album}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    );
  }
