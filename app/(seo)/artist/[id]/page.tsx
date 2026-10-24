import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArtists, getAllTracks, normalizeName } from "@/lib/seo-data";

const siteUrl = "https://ahangbazar.vercel.app";

type Props = { params: Promise<{ id: string }> };

async function load(id: string) {
  const [tracks, artists] = await Promise.all([
    getAllTracks(),
    getAllArtists(),
  ]);
  const artist = artists.find((a) => a.id === id);
  if (!artist) return null;
  const list = tracks.filter(
    (t) => normalizeName(t.artist) === normalizeName(artist.name),
  );
  return { artist, list };
}

export async function generateStaticParams() {
  const artists = await getAllArtists();
  return artists.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await load(id);
  if (!data) return {};
  const { artist, list } = data;
  const name = artist.faName || artist.name;
  const title = `آهنگ‌های ${name}`;
  const description =
    artist.bio?.slice(0, 160) ||
    `${list.length} آهنگ از ${name} را در آهنگ بازار گوش کن.`;
  const image = artist.coverUrl ?? list[0]?.art ?? `${siteUrl}/icon-512.png`;
  return {
    title,
    description,
    alternates: { canonical: `/artist/${artist.id}` },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `/artist/${artist.id}`,
      siteName: "آهنگ بازار",
      locale: "fa_IR",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { id } = await params;
  const data = await load(id);
  if (!data) notFound();
  const { artist, list } = data;
  const name = artist.faName || artist.name;
  const image = artist.coverUrl ?? list[0]?.art ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name,
    url: `${siteUrl}/artist/${artist.id}`,
    ...(image ? { image } : {}),
    ...(artist.bio ? { description: artist.bio } : {}),
    track: list.map((t) => ({
      "@type": "MusicRecording",
      name: t.faTitle || t.title,
      url: `${siteUrl}/track/${t.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="seo-crumbs">
        <Link href="/">AhangBazar</Link>
      </nav>

      <header className="seo-artist-head">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} width={260} height={260} />
        )}
        <div>
          <h1 dir="auto">{name}</h1>
          <p className="seo-meta">{list.length} tracks</p>
          {artist.bio && <p dir="auto">{artist.bio}</p>}
          <Link className="seo-cta" href="/">
            Open AhangBazar
          </Link>
        </div>
      </header>

      <section className="seo-section">
        <ul className="seo-list">
          {list.map((t) => (
            <li key={t.id}>
              <Link href={`/track/${t.id}`} dir="auto">
                {t.faTitle || t.title}
              </Link>
              {t.time !== "0:00" && <span>{t.time}</span>}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
