// app/artist/page.tsx
import Link from "next/link";

const dummyArtists = [
  { id: 1, name: "محسن یگانه" },
  { id: 2, name: "محسن چاوشی" },
];

export default async function ArtistsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لیست هنرمندان</h1>
      <ul className="space-y-2">
        {dummyArtists.map((artist) => (
          <li key={artist.id}>
            <Link href={`/artist/${artist.id}`} className="text-blue-500 underline">
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
