-- Create site_settings table for admin-manageable site-wide values
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_label TEXT NOT NULL,
  setting_group TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for frontend components like Footer, StatsBar)
CREATE POLICY "Anyone can view settings" 
ON public.site_settings FOR SELECT USING (true);

-- Authenticated users can manage settings (matches pattern used by team_members, partner_logos, etc.)
CREATE POLICY "Authenticated users can manage settings" 
ON public.site_settings FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger for updated_at timestamp (uses existing handle_updated_at function)
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Seed initial data with current hardcoded values
INSERT INTO public.site_settings (setting_key, setting_value, setting_label, setting_group, display_order) VALUES
('phone_number', '859-816-2314', 'Phone Number', 'contact', 1),
('email_primary', 'info@radcliffconstructiongroup.com', 'Primary Email', 'contact', 2),
('service_area', 'Greater Cincinnati, Dayton, Lexington, and Northern Kentucky', 'Service Area', 'contact', 3),
('stat_years_experience', '25+', 'Years Experience', 'stats', 1),
('stat_projects_completed', '100+', 'Projects Completed', 'stats', 2),
('stat_client_satisfaction', '98%', 'Client Satisfaction', 'stats', 3),
('stat_coverage', '4-State', 'Geographic Coverage', 'stats', 4),
('social_linkedin', '', 'LinkedIn URL', 'social', 1),
('social_facebook', '', 'Facebook URL', 'social', 2);