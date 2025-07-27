import SEO from "@/components/seo/SEO";
import PopularSongsSection from "@/components/ui/PopularSongsSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-3">
      <SEO
        title="آهنگ بازار - دانلود آهنگ جدید"
        description="دانلود جدیدترین آهنگ‌ها با کیفیت بالا و لینک مستقیم."
        keywords="دانلود آهنگ, آهنگ ایرانی, دانلود آهنگ جدید"
        canonical="https://ahangbazar.vercel.app/"
      />
      <PopularSongsSection />
    </main>
  );
}
