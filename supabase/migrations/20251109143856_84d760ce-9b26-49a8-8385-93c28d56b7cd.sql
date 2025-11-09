-- Remove the detailed_description column from projects table
ALTER TABLE public.projects DROP COLUMN IF EXISTS detailed_description;