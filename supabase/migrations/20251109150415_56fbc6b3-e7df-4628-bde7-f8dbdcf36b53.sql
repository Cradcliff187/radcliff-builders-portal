-- Update existing "Education" values to "Professional" in projects table
UPDATE projects 
SET industry = 'Professional' 
WHERE industry = 'Education';

-- Update existing "Education" values to "Professional" in case_studies table
UPDATE case_studies 
SET industry = 'Professional' 
WHERE industry = 'Education';

-- Note: Since industry is stored as TEXT (not an enum), no constraint updates needed
-- The validation happens at the application layer via Zod schemas