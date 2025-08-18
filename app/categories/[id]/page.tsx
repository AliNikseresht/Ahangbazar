import { supabase } from "@/libs/supabase/supabaseClient";
import CategoryPageClient from "./_components/CategoryPageClient";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const { data: tracks, error } = await supabase
    .from("songs")
    .select("*")
    .eq("category_id", id);

  if (error) {
    return (
      <div className="text-center text-red-500">خطا در بارگذاری آهنگ‌ها</div>
    );
  }

  const { data: categoryData } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  const categoryName = categoryData?.name || "دسته‌بندی";

  return (
    <CategoryPageClient tracks={tracks || []} categoryName={categoryName} />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: categoryData } = await supabase
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  const categoryName = categoryData?.name || "دسته‌بندی";

  const title = `${categoryName} - آهنگ‌ها | آهنگ بازار`;
  const description = `صفحه‌ای شامل همه آهنگ‌های دسته‌بندی ${categoryName} برای گوش دادن و دانلود.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ahangbazar.vercel.app/categories/${id}`,
      siteName: "آهنگ بازار",
      images: [{ url: "/ahangbazar-logo.png", width: 800, height: 600 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/ahangbazar-logo.png"],
    },
  };
}
