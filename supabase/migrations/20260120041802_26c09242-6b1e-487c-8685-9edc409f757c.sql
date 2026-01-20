-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_title TEXT NOT NULL,
  company_description TEXT NOT NULL,
  industry TEXT,
  project_metrics TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "testimonials_select_published" 
ON public.testimonials 
FOR SELECT 
USING (published = true);

CREATE POLICY "testimonials_insert_authenticated" 
ON public.testimonials 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "testimonials_update_authenticated" 
ON public.testimonials 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "testimonials_delete_authenticated" 
ON public.testimonials 
FOR DELETE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;

-- Seed data (4 testimonials)
INSERT INTO public.testimonials (quote, author_name, author_title, company_description, industry, project_metrics, display_order, published)
VALUES 
  (
    'RCG completed our 8,000 sq ft ICU renovation three weeks ahead of schedule—while the adjacent wing remained fully operational. Their ICRA protocols were flawless. We''ve now partnered with them on 4 projects across our system.',
    'Sarah M.',
    'Regional Director of Facilities',
    'Multi-Site Healthcare System',
    'Healthcare',
    '4 projects completed',
    1,
    true
  ),
  (
    'We needed a contractor who understood the unique challenges of renovating an occupied office building. RCG delivered our lobby modernization on time, under budget, and we didn''t lose a single tenant. Their communication throughout was exceptional.',
    'James R.',
    'Property Development Manager',
    'Commercial Real Estate Firm',
    'Commercial',
    '100% tenant retention',
    2,
    true
  ),
  (
    'In retail, downtime equals lost revenue. RCG completed our 12-store regional rollout in record time without sacrificing quality. Their ability to replicate consistent results across multiple sites made them invaluable.',
    'Michelle T.',
    'Regional Construction Manager',
    'National Retail Chain',
    'Retail',
    '12 stores, 8-week timeline',
    3,
    true
  ),
  (
    'RCG brings a level of professionalism and reliability that''s rare in commercial construction. From preconstruction planning to final walkthrough, they treated our project like it was their own. They''ve earned our repeat business.',
    'David K.',
    'Director of Facilities & Operations',
    'Regional Professional Services Firm',
    'Professional',
    '3 consecutive projects',
    4,
    true
  );