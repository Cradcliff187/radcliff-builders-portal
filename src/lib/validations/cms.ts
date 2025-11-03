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
  published: z.boolean().default(false),
});

export const caseStudySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  industry: z.enum(["Healthcare", "Education", "Retail", "Commercial"], {
    required_error: "Please select an industry",
  }),
  challenge: z.string().min(50, "Challenge must be at least 50 characters"),
  solution: z.string().min(50, "Solution must be at least 50 characters"),
  result: z.string().min(50, "Result must be at least 50 characters"),
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
  industry: z.enum(["Healthcare", "Education", "Retail", "Commercial"], {
    required_error: "Please select an industry",
  }),
  description: z.string().min(50, "Description must be at least 50 characters"),
  image_url: z.string().min(1, "Image is required"),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  display_order: z.number().int().min(0).nullable().default(0),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
export type CaseStudyFormData = z.infer<typeof caseStudySchema>;
export type ResourceFormData = z.infer<typeof resourceSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
