-- Create partner_logos table
CREATE TABLE public.partner_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  website_url text,
  priority integer DEFAULT 0,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_logos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published partner logos"
  ON public.partner_logos
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage partner logos"
  ON public.partner_logos
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Updated_at trigger
CREATE TRIGGER update_partner_logos_updated_at
  BEFORE UPDATE ON public.partner_logos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert existing partner data
INSERT INTO public.partner_logos (name, image_url, alt_text, website_url, priority, published) VALUES
  ('Mercy Health', '/assets/partners/mercy-health.png', 'Mercy Health - Healthcare Partner', 'https://www.mercy.com/', 1, true),
  ('UC Health', '/assets/partners/uc-health.png', 'UC Health - Healthcare Partner', 'https://www.uchealth.com/', 2, true),
  ('State Farm', '/assets/partners/state-farm.png', 'State Farm - Insurance Partner', 'https://www.statefarm.com/', 3, true),
  ('Cushman & Wakefield', '/assets/partners/cushman-wakefield.png', 'Cushman & Wakefield - Commercial Real Estate Partner', 'https://www.cushmanwakefield.com/', 4, true),
  ('Lee & Associates', '/assets/partners/lee-associates.png', 'Lee & Associates - Commercial Real Estate Partner', 'https://www.leeassociates.com/', 5, true),
  ('Simon', '/assets/partners/simon.png', 'Simon - Retail & Commercial Real Estate Partner', 'https://www.simon.com/', 6, true),
  ('Level 4 Construction', '/assets/partners/level-4-construction.png', 'Level 4 Construction - Construction Industry Partner', 'https://www.level4construction.com/', 7, true),
  ('Big Boy', '/assets/partners/big-boy-new.png', 'Big Boy - Retail Partner', 'https://www.bigboy.com/', 8, true),
  ('Perspectives Skills for Life', '/assets/partners/perspectives.png', 'Perspectives Skills for Life - Education Partner', NULL, 9, true);