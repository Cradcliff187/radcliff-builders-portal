-- Update storage bucket to allow PDFs in addition to images
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'image/png', 
  'image/jpeg', 
  'image/jpg', 
  'image/webp', 
  'application/pdf'
]
WHERE id = 'company-assets';