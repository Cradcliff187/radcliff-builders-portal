import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    scopePlaceholder: "e.g., Patient care area renovation, Surgical suite expansion",
  },
  Professional: {
    title: "Plan Your Office Buildout",
    subtitle: "Create a professional workspace that enhances productivity while minimizing business disruption.",
    scopePlaceholder: "e.g., Office renovation, Corporate headquarters buildout",
  },
  Retail: {
    title: "Multi-Site Rollout Estimate",
    subtitle: "Fast-track scheduling and brand standards compliance for single or multi-location retail projects.",
    scopePlaceholder: "e.g., Store renovation, Multi-site retail rollout",
  },
  Commercial: {
    title: "Commercial Project Consultation",
    subtitle: "Flexible scheduling and code compliance for office buildings, warehouses, and mixed-use developments.",
    scopePlaceholder: "e.g., Office building renovation, Warehouse expansion",
  },
};

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const industryParam = searchParams.get('industry') as "Healthcare" | "Professional" | "Retail" | "Commercial" | null;
  
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
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
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
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">
            {industryParam && industryContent[industryParam] 
              ? industryContent[industryParam].title 
              : "Let's Build Something That Lasts."}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            {industryParam && industryContent[industryParam]
              ? industryContent[industryParam].subtitle
              : "Whether you're planning a healthcare renovation, professional office upgrade, or commercial buildout, we're here to help."}
          </p>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Give us a call, send an email, or fill out the form below. We'll get back to you within 24 hours to discuss your project, answer questions, and schedule a site walk or consultation—no pressure, just conversation.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <Card className="p-6">
                <Phone className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Phone</h3>
                <a
                  href="tel:859-816-2314"
                  className="text-muted-foreground hover:text-secondary transition-colors"
                >
                  859-816-2314
                </a>
              </Card>

              <Card className="p-6">
                <Mail className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Email</h3>
                <a
                  href="mailto:info@radcliffcg.com"
                  className="text-muted-foreground hover:text-secondary transition-colors break-all"
                >
                  info@radcliffcg.com
                </a>
              </Card>

              <Card className="p-6">
                <MapPin className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Service Area</h3>
                <div className="mt-4 w-full h-48 rounded-none overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5063144.438792156!2d-87.73584875!3d38.9646235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU3JzUyLjYiTiA4NcKwMzAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1647889234567!5m2!1sen!2sus&z=7"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RCG Service Area - Kentucky, Ohio, Tennessee, Indiana"
                  />
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
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
                            <FormLabel>Organization</FormLabel>
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
