-- ============================================
-- PHASE 1: Create CMS Tables with RLS
-- ============================================

-- 1. Create insights_articles table
CREATE TABLE IF NOT EXISTS public.insights_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('Healthcare', 'Best Practices', 'Professional')),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date DATE NOT NULL,
  read_time TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('Healthcare', 'Professional', 'Retail', 'Commercial')),
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  industry TEXT NOT NULL CHECK (industry IN ('Healthcare', 'Professional', 'Retail', 'Commercial')),
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  result TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Whitepaper', 'Resource', 'Guide')),
  file_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Enable Row Level Security
-- ============================================

ALTER TABLE public.insights_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies: Public can view published content
-- ============================================

-- Articles: Public SELECT for published
CREATE POLICY "Anyone can view published articles"
  ON public.insights_articles
  FOR SELECT
  USING (published = true);

-- Projects: Public SELECT for published
CREATE POLICY "Anyone can view published projects"
  ON public.projects
  FOR SELECT
  USING (published = true);

-- Case Studies: Public SELECT for published
CREATE POLICY "Anyone can view published case studies"
  ON public.case_studies
  FOR SELECT
  USING (published = true);

-- Resources: Public SELECT for published
CREATE POLICY "Anyone can view published resources"
  ON public.resources
  FOR SELECT
  USING (published = true);

-- ============================================
-- RLS Policies: Authenticated users can manage
-- ============================================

-- Articles: Admin full access
CREATE POLICY "Authenticated users can manage articles"
  ON public.insights_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects: Admin full access
CREATE POLICY "Authenticated users can manage projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Case Studies: Admin full access
CREATE POLICY "Authenticated users can manage case studies"
  ON public.case_studies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Resources: Admin full access
CREATE POLICY "Authenticated users can manage resources"
  ON public.resources
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Auto-update timestamps
-- ============================================

CREATE TRIGGER set_updated_at_articles
  BEFORE UPDATE ON public.insights_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_case_studies
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_resources
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- Insert Existing Content (All Published)
-- ============================================

-- Articles from Insights.tsx
INSERT INTO public.insights_articles (category, title, excerpt, date, read_time, published) VALUES
('Healthcare', 'ICRA Compliance: Essential Protocols for Healthcare Renovations', 'Understanding infection control risk assessment requirements and best practices for maintaining patient safety during occupied facility construction.', '2025-03-15', '5 min read', true),
('Best Practices', 'Minimizing Disruption: Phased Construction in Active Facilities', 'Strategic approaches to project phasing that maintain operational continuity while delivering on-time, high-quality renovation results.', '2025-03-08', '4 min read', true),
('Professional', 'After-Hours Construction: Maximizing Professional Facility Upgrades', 'How to plan and execute major renovation projects during off-hours to minimize impact on staff and clients while staying on budget.', '2025-02-28', '6 min read', true);

-- Projects from Projects.tsx
INSERT INTO public.projects (title, industry, description, image_url, featured, published, display_order) VALUES
('Regional Medical Center Expansion', 'Healthcare', '300,000 sq ft hospital expansion with state-of-the-art patient care facilities', '/assets/hero-healthcare.jpg', true, true, 1),
('Retail Excellence Center', 'Retail', 'Modern retail space featuring innovative display systems and customer experience zones', '/assets/project-retail.jpg', true, true, 2),
('Corporate Office Campus', 'Professional', '75,000 sq ft Class A office space with advanced technology and collaborative work areas', '/assets/project-professional.jpg', true, true, 3),
('Corporate Office Campus', 'Commercial', '120,000 sq ft Class A office space with sustainable design features', '/assets/project-commercial.jpg', false, true, 4),
('Surgical Center Renovation', 'Healthcare', 'Complete renovation of outpatient surgical facility meeting all ICRA standards', '/assets/hero-healthcare.jpg', false, true, 5),
('Financial Services Office', 'Professional', 'New 45,000 sq ft secure office facility for financial services firm', '/assets/project-professional.jpg', false, true, 6);

-- Case Studies from Insights.tsx
INSERT INTO public.case_studies (title, industry, challenge, solution, result, published) VALUES
('Regional Medical Center ICU Expansion', 'Healthcare', 'Complete 8,000 sq ft ICU renovation in occupied hospital wing without patient relocation', 'Phased ICRA-compliant construction with 24/7 infection control monitoring and strategic containment', '100% on-time delivery, zero operational disruptions, full regulatory compliance', true),
('Corporate Office Tower Modernization', 'Professional', 'Upgrade 20,000 sq ft office space during business hours with ongoing operations in adjacent areas', 'After-hours and weekend construction schedule with comprehensive security protocols and dust control', 'Project completed on schedule, minimal operational disruption, under budget', true),
('Multi-Tenant Office Building Renovation', 'Commercial', 'Modernize common areas and tenant spaces while maintaining full building operations', 'Rolling phased approach with flexible scheduling and proactive tenant communication', 'All tenants retained, positive feedback, 98% satisfaction rating', true);

-- Resources from Insights.tsx
INSERT INTO public.resources (title, description, type, published) VALUES
('ICRA Certification Guide', 'Comprehensive overview of infection control requirements for healthcare construction', 'Whitepaper', true),
('Project Planning Checklist', 'Essential steps for planning compliant renovations in sensitive environments', 'Resource', true),
('Regulatory Compliance Matrix', 'Key regulations and standards for healthcare, professional, and commercial projects', 'Guide', true);