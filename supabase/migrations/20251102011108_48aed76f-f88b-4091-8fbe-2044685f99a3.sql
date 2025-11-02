-- Create public storage bucket for company assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'company-assets',
  'company-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/jpg']
);

-- Create RLS policy for public read access
CREATE POLICY "Public read access to company assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-assets');

-- Allow authenticated users to upload (for future admin panel)
CREATE POLICY "Authenticated users can upload company assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'company-assets' AND auth.role() = 'authenticated');

-- Allow authenticated users to update company assets
CREATE POLICY "Authenticated users can update company assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'company-assets' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete company assets
CREATE POLICY "Authenticated users can delete company assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'company-assets' AND auth.role() = 'authenticated');