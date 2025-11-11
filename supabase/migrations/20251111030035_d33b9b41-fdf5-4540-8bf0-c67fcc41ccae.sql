-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  headshot_url TEXT NOT NULL,
  bio_short TEXT NOT NULL,
  bio_long TEXT NOT NULL,
  anchor_id TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view published team members
CREATE POLICY "Anyone can view published team members" 
ON public.team_members 
FOR SELECT 
USING (published = true);

-- RLS Policy: Authenticated users can manage all team members
CREATE POLICY "Authenticated users can manage team members" 
ON public.team_members 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert existing team members as initial data
INSERT INTO public.team_members (name, title, headshot_url, bio_short, bio_long, anchor_id, display_order, published) VALUES
(
  'Matt Radcliff',
  'President & Founder',
  '/images/team/matt-radcliff-2025.jpg',
  'With 20+ years in construction, Matt leads RCG with a hands-on approach focused on trust, safety, and precision.',
  'With over two decades of experience in the construction industry, Matt Radcliff founded Radcliff Construction Group with a vision to build trusted relationships and deliver exceptional results. His hands-on leadership style ensures every project meets the highest standards of safety, quality, and precision. Matt''s commitment to operational excellence and client satisfaction has made RCG a trusted partner across healthcare, education, retail, and commercial sectors.',
  'matt-radcliff',
  1,
  true
),
(
  'Tony Kelly',
  'Vice President',
  '/images/team/tony-kelly.jpg',
  'Entrepreneurial leader with deep operational discipline—focused on safe, efficient execution and client satisfaction.',
  'Tony Kelly brings entrepreneurial energy and operational discipline to every project at Radcliff Construction Group. With extensive experience in construction management, Tony focuses on safe, efficient execution while maintaining the highest standards of client satisfaction. His leadership ensures projects are delivered on time, within budget, and exceed client expectations.',
  'tony-kelly',
  2,
  true
),
(
  'Chris Radcliff',
  'Vice President',
  '/images/team/chris-radcliff.jpg',
  'Executive experience across healthcare, commercial, and professional sectors—driving predictable, compliant delivery.',
  'Chris Radcliff brings executive-level experience across healthcare, commercial, and professional construction sectors. His focus on predictable, compliant delivery ensures that every project meets regulatory requirements and client expectations. Chris''s expertise in complex project coordination and stakeholder management has been instrumental in RCG''s success in delivering high-stakes construction projects.',
  'chris-radcliff',
  3,
  true
);