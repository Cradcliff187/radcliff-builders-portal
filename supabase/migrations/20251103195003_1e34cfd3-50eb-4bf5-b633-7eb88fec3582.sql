-- Add URL and content fields to insights_articles
ALTER TABLE insights_articles 
ADD COLUMN article_url TEXT,
ADD COLUMN content TEXT;

-- Add URL field to case_studies
ALTER TABLE case_studies
ADD COLUMN case_study_url TEXT;