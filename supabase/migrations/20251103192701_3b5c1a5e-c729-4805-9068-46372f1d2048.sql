-- Storage policies for company-assets bucket
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload to company-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'company-assets');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update company-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'company-assets');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete from company-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'company-assets');

-- Allow public to read files
CREATE POLICY "Public can read company-assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'company-assets');