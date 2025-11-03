import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, path: string): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${path}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("company-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from("company-assets")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteFile(url: string): Promise<void> {
  const urlParts = url.split("/company-assets/");
  if (urlParts.length < 2) return;

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from("company-assets")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting file:", error);
  }
}
