import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  organization: z
    .string()
    .trim()
    .max(100, "Organization name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s\-\+\(\)\.]*$/, "Please enter a valid phone number")
    .max(20, "Phone number must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  scope: z
    .string()
    .trim()
    .max(200, "Project scope must be less than 200 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  industry: z
    .enum(["Healthcare", "Professional", "Retail", "Commercial"])
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
