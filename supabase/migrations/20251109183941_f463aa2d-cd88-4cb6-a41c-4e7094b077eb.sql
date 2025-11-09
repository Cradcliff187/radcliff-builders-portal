-- Add industry column to track lead source for conversion optimization
ALTER TABLE contact_submissions 
ADD COLUMN industry text;

-- Add comment for documentation
COMMENT ON COLUMN contact_submissions.industry IS 'Industry context when user submitted form (Healthcare, Professional, Retail, Commercial) - used for lead source tracking and conversion analysis';