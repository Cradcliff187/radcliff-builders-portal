-- Add new fields to projects table for enhanced project details page

-- Project type (e.g., "New Construction", "Renovation", "Occupied Renovation")
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type TEXT;

-- Duration in weeks
ALTER TABLE projects ADD COLUMN IF NOT EXISTS duration_weeks INTEGER;

-- Array of key features/highlights
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[];

-- Testimonial fields
ALTER TABLE projects ADD COLUMN IF NOT EXISTS testimonial_quote TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS testimonial_author TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS testimonial_title TEXT;

-- Case study PDF download URL (for future use)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS case_study_pdf_url TEXT;

COMMENT ON COLUMN projects.project_type IS 'Type of project (e.g., New Construction, Renovation, Tenant Improvement)';
COMMENT ON COLUMN projects.duration_weeks IS 'Project duration in weeks';
COMMENT ON COLUMN projects.key_features IS 'Array of key project features/highlights';
COMMENT ON COLUMN projects.testimonial_quote IS 'Client testimonial quote';
COMMENT ON COLUMN projects.testimonial_author IS 'Name of testimonial author';
COMMENT ON COLUMN projects.testimonial_title IS 'Job title and company of testimonial author';
COMMENT ON COLUMN projects.case_study_pdf_url IS 'URL to downloadable case study PDF';