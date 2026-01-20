import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  category: z.enum(["Industry Insights", "Best Practices", "Case Studies"], {
    required_error: "Please select a category",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  excerpt: z.string().min(50, "Excerpt must be at least 50 characters").max(500, "Excerpt must be less than 500 characters"),
  read_time: z.string().min(1, "Read time is required"),
  article_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().optional(),
  published: z.boolean().default(false),
});

export const caseStudySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  industry: z.enum(["Healthcare", "Professional", "Retail", "Commercial"], {
    required_error: "Please select an industry",
  }),
  challenge: z.string().min(50, "Challenge must be at least 50 characters"),
  solution: z.string().min(50, "Solution must be at least 50 characters"),
  result: z.string().min(50, "Result must be at least 50 characters"),
  case_study_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export const resourceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(500, "Description must be less than 500 characters"),
  type: z.enum(["Guide", "Checklist", "Whitepaper", "Template"], {
    required_error: "Please select a type",
  }),
  file_url: z.string().optional(),
  published: z.boolean().default(false),
});

export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(200, "Slug must be less than 200 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  industry: z.enum(["Healthcare", "Professional", "Retail", "Commercial"], {
    required_error: "Please select an industry",
  }),
  description: z.string().min(50, "Project overview must be at least 50 characters").max(1000, "Project overview must be less than 1000 characters"),
  image_url: z.string().min(1, "Primary image is required"),
  client_name: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  square_footage: z.number().int().positive("Square footage must be positive").optional().nullable(),
  project_value: z.string().max(100).optional(),
  start_date: z.date().optional().nullable(),
  completion_date: z.date().optional().nullable(),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  outcomes: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  display_order: z.number().int().min(0).nullable().default(0),
});

export const projectImageSchema = z.object({
  id: z.string().uuid().optional(),
  project_id: z.string().uuid().optional(),
  image_url: z.string().url("Must be a valid image URL"),
  caption: z.string().max(200).optional(),
  display_order: z.number().int().min(0).default(0),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  headshot_url: z.string().min(1, "Headshot image is required"),
  bio_short: z.string().min(10, "Short bio must be at least 10 characters").max(300, "Short bio must be less than 300 characters"),
  bio_long: z.string().min(50, "Full bio must be at least 50 characters").max(2000, "Full bio must be less than 2000 characters"),
  anchor_id: z.string().min(1, "Anchor ID is required").max(50, "Anchor ID must be less than 50 characters").regex(/^[a-z0-9-]+$/, "Anchor ID can only contain lowercase letters, numbers, and hyphens"),
  display_order: z.number().int().min(0).nullable().default(0),
  published: z.boolean().default(false),
});

export const partnerLogoSchema = z.object({
  name: z.string().min(1, "Partner name is required").max(100),
  image_url: z.string().min(1, "Logo image is required"),
  alt_text: z.string().min(10, "Alt text should be descriptive (min 10 characters)").max(200),
  website_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  priority: z.number().int().min(0).nullable().default(0),
  published: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  quote: z.string().min(50, "Quote must be at least 50 characters").max(1000, "Quote must be less than 1000 characters"),
  author_name: z.string().min(1, "Author name is required").max(100, "Author name must be less than 100 characters"),
  author_title: z.string().min(1, "Author title is required").max(100, "Author title must be less than 100 characters"),
  company_description: z.string().min(1, "Company description is required").max(200, "Company description must be less than 200 characters"),
  industry: z.enum(["Healthcare", "Professional", "Retail", "Commercial"]).optional().nullable(),
  project_metrics: z.string().max(100).optional().or(z.literal("")),
  display_order: z.number().int().min(0).nullable().default(0),
  published: z.boolean().default(true),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform name is required").max(50, "Platform name must be less than 50 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  icon_name: z.string().min(1, "Icon name is required"),
  display_order: z.number().int().min(0).default(0),
  published: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
export type CaseStudyFormData = z.infer<typeof caseStudySchema>;
export type ResourceFormData = z.infer<typeof resourceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;
export type PartnerLogoFormData = z.infer<typeof partnerLogoSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;
