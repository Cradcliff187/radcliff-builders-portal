import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    scope: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      organization: "",
      email: "",
      phone: "",
      scope: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Ready to start your project? Let's discuss how RCG can help bring your vision to life.
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
                  href="mailto:info@radcliffconstructiongroup.com"
                  className="text-muted-foreground hover:text-secondary transition-colors break-all"
                >
                  info@radcliffconstructiongroup.com
                </a>
              </Card>

              <Card className="p-6">
                <MapPin className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-2 uppercase">Service Area</h3>
                <p className="text-muted-foreground">
                  Regional construction services with nationwide capabilities
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="mb-8 uppercase">Request Consultation</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="scope">Project Scope</Label>
                    <Input
                      id="scope"
                      name="scope"
                      value={formData.scope}
                      onChange={handleChange}
                      placeholder="e.g., Healthcare renovation, New construction"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" variant="secondary" size="lg" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
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
