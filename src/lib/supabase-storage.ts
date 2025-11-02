const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Get public URL for a file in Supabase Storage
 */
export const getStorageUrl = (bucket: string, path: string): string => {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
};

/**
 * Get URL for a partner logo from cloud storage
 */
export const getPartnerLogo = (filename: string): string => {
  return getStorageUrl('company-assets', `logos/${filename}`);
};

/**
 * Get URL for a project image from cloud storage
 */
export const getProjectImage = (filename: string): string => {
  return getStorageUrl('company-assets', `projects/${filename}`);
};
