import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, path: string): Promise<string> {
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File exceeds 5MB limit. Please compress your image before uploading.");
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase();
  if (!fileExt) {
    throw new Error("File must have an extension");
  }

  // Validate file type based on path
  if (path === "projects" && !["jpg", "jpeg", "png", "webp"].includes(fileExt)) {
    throw new Error("Only JPG, PNG, or WEBP images are allowed");
  }
  if (path === "resources" && fileExt !== "pdf") {
    throw new Error("Resources must be PDF files");
  }

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

export async function uploadMultipleFiles(
  files: File[],
  path: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const uploadPromises = files.map(async (file, index) => {
    try {
      const url = await uploadFile(file, path);
      onProgress?.(index, 100);
      return url;
    } catch (error) {
      onProgress?.(index, 0);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
}
