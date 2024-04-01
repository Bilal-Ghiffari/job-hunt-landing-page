import { createClient } from "@supabase/supabase-js";
import { randomId } from "./utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!!
);

export const supabasePublicUrl = async (filename: string, bucket: string) => {
  const {
    data: { publicUrl },
  } = await supabase.storage.from(bucket).getPublicUrl(`public/${filename}`);
  return publicUrl;
};

export const supabaseUploadFile = async (
  file: File | string,
  bucket: string
) => {
  const filename = `resume-${randomId(5)}.pdf`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, filename, error };
};
