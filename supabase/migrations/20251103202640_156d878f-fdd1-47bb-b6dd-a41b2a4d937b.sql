-- Create project_images table for multiple images per project
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- RLS: Anyone can view images for published projects
CREATE POLICY "Anyone can view images for published projects"
ON project_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = project_images.project_id 
    AND projects.published = true
  )
);

-- RLS: Authenticated users can manage all project images
CREATE POLICY "Authenticated users can manage project images"
ON project_images FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Add indexes for performance
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_images_display_order ON project_images(display_order);

-- Add new detail columns to projects table
ALTER TABLE projects 
ADD COLUMN slug TEXT,
ADD COLUMN client_name TEXT,
ADD COLUMN location TEXT,
ADD COLUMN square_footage INTEGER,
ADD COLUMN project_value TEXT,
ADD COLUMN start_date DATE,
ADD COLUMN completion_date DATE,
ADD COLUMN detailed_description TEXT,
ADD COLUMN challenges TEXT,
ADD COLUMN solutions TEXT,
ADD COLUMN outcomes TEXT;

-- Generate unique slugs from existing titles
WITH numbered_rows AS (
  SELECT 
    id,
    title,
    ROW_NUMBER() OVER (PARTITION BY LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]+', '', 'g'), '\s+', '-', 'g')) ORDER BY created_at) as rn
  FROM projects
),
slug_generation AS (
  SELECT 
    id,
    CASE 
      WHEN rn = 1 THEN LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]+', '', 'g'), '\s+', '-', 'g'))
      ELSE LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]+', '', 'g'), '\s+', '-', 'g')) || '-' || rn::text
    END as generated_slug
  FROM numbered_rows
)
UPDATE projects 
SET slug = slug_generation.generated_slug
FROM slug_generation
WHERE projects.id = slug_generation.id;

-- Make slug unique and non-nullable
ALTER TABLE projects 
ADD CONSTRAINT projects_slug_unique UNIQUE (slug),
ALTER COLUMN slug SET NOT NULL;

-- Add index for slug lookups
CREATE INDEX idx_projects_slug ON projects(slug);

-- Add trigger for updated_at on project_images
CREATE TRIGGER update_project_images_updated_at
BEFORE UPDATE ON project_images
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();