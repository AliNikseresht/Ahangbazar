import { notFound } from "next/navigation";
import React from "react";

// Update the type to handle async params
type ArtistsPageProps = {
  params: Promise<{ id: string }>;
};

const dummyArtists = [
  { id: "1", name: "محسن یگانه", bio: "بیوگرافی محسن یگانه..." },
  { id: "2", name: "محسن چاوشی", bio: "بیوگرافی محسن چاوشی..." },
];

const ArtistsDetailsPage = async ({ params }: ArtistsPageProps) => {
  // Await the params to get the resolved params
  const { id } = await params;
  
  const artist = dummyArtists.find((a) => a.id === id);
  if (!artist) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{artist.name}</h1>
      <p className="text-gray-700">{artist.bio}</p>
    </div>
  );
};

export default ArtistsDetailsPage;