-- Create brand-assets bucket for social images and brand materials
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'brand-assets',
  'brand-assets',
  true,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policy: Allow public read access
CREATE POLICY "Public read access for brand assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-assets');

-- RLS policy: Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload brand assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'brand-assets' AND auth.role() = 'authenticated');