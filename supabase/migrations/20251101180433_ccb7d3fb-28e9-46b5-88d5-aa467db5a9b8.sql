-- Create newsletter_subscribers table for Insights page newsletter signup
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe (public insert)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view subscribers (admin access)
CREATE POLICY "Authenticated users can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);

-- Create index on status for filtering
CREATE INDEX idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);