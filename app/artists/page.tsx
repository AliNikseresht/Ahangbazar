import ArtistsButton from "@/components/ui/ArtistsButton";
import { fetchArtists } from "@/services/fetchArtists";
import React from "react";

const ArtistsPage = async () => {
  const artists = await fetchArtists();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">هنرمندان</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="border rounded p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{artist.name}</h2>
            <p className="text-gray-300">{artist.bio || "در حال حاضر بیوگرفای موجود نیست."}</p>
            <ArtistsButton artistName={artist.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
