import { notFound } from "next/navigation";
import React from "react";

type ArtistsPageProps = {
  params: { id: string };
};

const dummyArtists = [
  { id: 1, name: "محسن یگانه", bio: "بیوگرافی محسن یگانه..." },
  { id: 2, name: "محسن چاوشی", bio: "بیوگرافی محسن چاوشی..." },
];

const ArtistsDetailsPage = ({ params }: ArtistsPageProps) => {
  const artist = dummyArtists.find((a) => a.id === Number(params.id));
  if (!artist) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{artist.name}</h1>
      <p className="text-gray-700">{artist.bio}</p>
    </div>
  );
};

export default ArtistsDetailsPage;
