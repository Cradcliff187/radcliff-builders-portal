import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const industryContent = {
  Healthcare: {
    title: "Healthcare Facility Assessment",
    subtitle: "ICRA-certified teams ready to support your medical facility project with zero disruption to patient care.",
    scopePlaceholder: "e.g., ICU renovation, imaging suite buildout",
    helperText: "Examples: Patient care area renovation, surgical suite expansion, emergency department upgrade",
  },
  Professional: {
    title: "Plan Your Office Buildout",
    subtitle: "Create a professional workspace that enhances productivity while minimizing business disruption.",
    scopePlaceholder: "e.g., Class A office renovation",
    helperText: "Examples: Corporate headquarters buildout, tenant improvements, executive suite renovation",
  },
  Retail: {
    title: "Multi-Site Rollout Estimate",
    subtitle: "Fast-track scheduling and brand standards compliance for single or multi-location retail projects.",
    scopePlaceholder: "e.g., Store renovation, Multi-site retail rollout",
    helperText: "Examples: Brand refresh, new location buildout, tenant coordination",
  },
  Commercial: {
    title: "Commercial Project Consultation",
    subtitle: "Flexible scheduling and code compliance for office buildings, warehouses, and mixed-use developments.",
    scopePlaceholder: "e.g., Office building renovation, Warehouse expansion",
    helperText: "Examples: Mixed-use development, warehouse buildout, commercial space renovation",
  },
};

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const industryParamRaw = searchParams.get('industry');
  
  // Safely cast to industry enum
  const validIndustries = ["Healthcare", "Professional", "Retail", "Commercial"] as const;
  const industryParam = (industryParamRaw && validIndustries.includes(industryParamRaw as typeof validIndustries[number]))
    ? (industryParamRaw as typeof validIndustries[number])
    : null;
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      phone: "",
      scope: "",
      message: "",
      industry: industryParam || undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: data.name,
          organization: data.organization || null,
          email: data.email,
          phone: data.phone || null,
          project_scope: data.scope || null,
          message: data.message,
          industry: data.industry || null,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Thanks for reaching out!",
        description: "We'll be in touch within one business day.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="Contact Us | Radcliff Construction Group (RCG)"
        description="Contact Radcliff Construction Group for ICRA-certified healthcare renovations and commercial buildouts. Serving Greater Cincinnati, Dayton, Lexington, and Northern Kentucky. Response within one business day."
      />
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 uppercase leading-tight tracking-wider">
            {industryParam && industryContent[industryParam] 
              ? industryContent[industryParam].title 
              : "Let's Build Something That Lasts."}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            {industryParam && industryContent[industryParam]
              ? industryContent[industryParam].subtitle
              : "Whether you're planning a healthcare renovation, professional office upgrade, or commercial buildout, we're here to help."}
          </p>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            Give us a call, send an email, or fill out the form below. We'll respond within one business day to schedule a call or site walk.
          </p>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            No pressure, just conversation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6">
                <Phone className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Phone</h3>
              <a
                  href="tel:859-816-2314"
                  className="text-muted-foreground hover:text-secondary transition-colors"
                  aria-label="Call Radcliff Construction Group at (859) 816-2314"
                >
                  (859) 816-2314
                </a>
              </Card>

              <Card className="p-6">
                <Mail className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Email</h3>
                <a
                  href="mailto:info@radcliffconstructiongroup.com"
                  className="text-muted-foreground hover:text-secondary transition-colors break-all"
                >
                  info@radcliffconstructiongroup.com
                </a>
              </Card>

              <Card className="p-6">
                <MapPin className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Service Area</h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li>Cincinnati, OH</li>
                  <li>Dayton, OH</li>
                  <li>Lexington, KY</li>
                  <li>Northern Kentucky</li>
                </ul>
                <div className="mt-4 w-full min-h-[220px] rounded-none overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5063144.438792156!2d-87.73584875!3d38.9646235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzUyLjYiTiA4NcKwMzAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1647889234567!5m2!1sen!2sus&z=7"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '220px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RCG Service Area - Kentucky, Ohio, Tennessee, Indiana"
                  />
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="flex items-center justify-center lg:justify-start">
              <Card className="p-8 w-full max-w-[640px]">
                <h2 className="mb-8 uppercase">Request Consultation</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={mutation.isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization *</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={mutation.isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" disabled={mutation.isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" disabled={mutation.isPending} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="scope"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Scope</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                industryParam && industryContent[industryParam]
                                  ? industryContent[industryParam].scopePlaceholder
                                  : "e.g., Healthcare renovation, New construction"
                              }
                              disabled={mutation.isPending}
                            />
                          </FormControl>
                          {industryParam && industryContent[industryParam]?.helperText && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {industryContent[industryParam].helperText}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder="Tell us about your project..."
                              disabled={mutation.isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      disabled={mutation.isPending}
                      className="w-full md:w-auto"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
