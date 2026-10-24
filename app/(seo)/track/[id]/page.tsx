import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArtists,
  getAllTracks,
  normalizeName,
  toIsoDuration,
} from "@/lib/seo-data";

const siteUrl = "https://ahangbazar.vercel.app";

type Props = { params: Promise<{ id: string }> };

async function load(id: string) {
  const [tracks, artists] = await Promise.all([
    getAllTracks(),
    getAllArtists(),
  ]);
  const track = tracks.find((t) => t.id === id);
  if (!track) return null;
  const artist = artists.find(
    (a) => normalizeName(a.name) === normalizeName(track.artist),
  );
  const related = tracks
    .filter(
      (t) =>
        t.id !== track.id &&
        normalizeName(t.artist) === normalizeName(track.artist),
    )
    .slice(0, 6);
  return { track, artist, related };
}

export async function generateStaticParams() {
  const tracks = await getAllTracks();
  return tracks.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await load(id);
  if (!data) return {};
  const { track } = data;
  const name = track.faTitle || track.title;
  const by = track.faArtist || track.artist;
  const title = `${name} - ${by}`;
  const description = `پخش آنلاین آهنگ «${name}» از ${by} با کیفیت بالا در آهنگ بازار.`;
  return {
    title,
    description,
    alternates: { canonical: `/track/${track.id}` },
    openGraph: {
      type: "music.song",
      title,
      description,
      url: `/track/${track.id}`,
      siteName: "آهنگ بازار",
      locale: "fa_IR",
      images: [{ url: track.art ?? `${siteUrl}/icon-512.png` }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TrackPage({ params }: Props) {
  const { id } = await params;
  const data = await load(id);
  if (!data) notFound();
  const { track, artist, related } = data;

  const name = track.faTitle || track.title;
  const by = track.faArtist || track.artist;
  const iso = toIsoDuration(track.time);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name,
    url: `${siteUrl}/track/${track.id}`,
    byArtist: {
      "@type": "MusicGroup",
      name: by,
      ...(artist ? { url: `${siteUrl}/artist/${artist.id}` } : {}),
    },
    ...(track.art ? { image: track.art } : {}),
    ...(iso ? { duration: iso } : {}),
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
        {artist && (
          <>
            {" / "}
            <Link href={`/artist/${artist.id}`}>{by}</Link>
          </>
        )}
      </nav>

      <article className="seo-track">
        {track.art && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.art} alt={`${name} - ${by}`} width={260} height={260} />
        )}
        <div>
          <h1 dir="auto">{name}</h1>
          <p className="seo-sub" dir="auto">
            {by}
          </p>
          <p className="seo-meta">
            {track.time !== "0:00" && `${track.time} · `}
            {track.plays.toLocaleString("en-US")} plays
          </p>
          {track.audioUrl && (
            <audio controls preload="none" src={track.audioUrl} />
          )}
          <Link className="seo-cta" href={`/?track=${track.id}`}>
            Open AhangBazar
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="seo-section">
          <h2 dir="auto">{by}</h2>
          <ul className="seo-list">
            {related.map((t) => (
              <li key={t.id}>
                <Link href={`/track/${t.id}`} dir="auto">
                  {t.faTitle || t.title}
                </Link>
                {t.time !== "0:00" && <span>{t.time}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
