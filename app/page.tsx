import PopularSongsSection from "@/components/ui/PopularSongsSection";
import TopBoxSection from "@/components/ui/TopBoxSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-3">
      <TopBoxSection />
      <PopularSongsSection />
    </main>
  );
}
