-- Create social_links table
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  icon_name TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Anyone can view published social links
CREATE POLICY "Anyone can view published social links"
ON public.social_links FOR SELECT
USING (published = true);

-- Authenticated users can manage all social links (admin)
CREATE POLICY "Authenticated users can manage social links"
ON public.social_links FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON public.social_links
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for admin updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_links;

-- Seed with common platforms (unpublished by default)
INSERT INTO public.social_links (platform, url, icon_name, published, display_order) VALUES
('LinkedIn', '', 'Linkedin', false, 1),
('Facebook', '', 'Facebook', false, 2),
('Instagram', '', 'Instagram', false, 3),
('YouTube', '', 'Youtube', false, 4);