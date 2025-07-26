import { supabase } from "@/libs/supabase/supabaseClient";

export async function listAllFiles(
  path = ""
): Promise<{ name: string; isFolder: boolean }[]> {
  const { data, error } = await supabase.storage
    .from("music-files")
    .list(path, { limit: 1000 });

  if (error) throw error;

  let files: { name: string; isFolder: boolean }[] = [];

  for (const item of data) {
    // اگر پراپرتی 'id' وجود نداشت یعنی فولدر است
    const isFolder = !(item as any).id;

    if (isFolder) {
      // بازگشتی میریم داخل فولدر
      const nestedFiles = await listAllFiles(path + item.name + "/");
      files = files.concat(nestedFiles);
    } else {
      // فایل عادی، با مسیر کامل ذخیره می‌کنیم
      files.push({ name: path + item.name, isFolder: false });
    }
  }

  return files;
}
