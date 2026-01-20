-- Add lead qualification columns to contact_submissions table
ALTER TABLE public.contact_submissions
ADD COLUMN preferred_contact TEXT,
ADD COLUMN project_timeline TEXT,
ADD COLUMN referral_source TEXT;

COMMENT ON COLUMN public.contact_submissions.preferred_contact IS 'Lead preferred contact method: Phone Call, Email, Either';
COMMENT ON COLUMN public.contact_submissions.project_timeline IS 'Project timeline: This Quarter, Next 6 Months, Planning Phase (6+ Months), Just Exploring';
COMMENT ON COLUMN public.contact_submissions.referral_source IS 'How they heard about us: Google Search, LinkedIn, Referral, Industry Event, Previous Client, Other';