import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, FileText, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Insights = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const articles = [
    {
      category: "Healthcare",
      icon: FileText,
      title: "ICRA Compliance: Essential Protocols for Healthcare Renovations",
      excerpt: "Understanding infection control risk assessment requirements and best practices for maintaining patient safety during occupied facility construction.",
      date: "March 15, 2025",
      readTime: "5 min read",
    },
    {
      category: "Best Practices",
      icon: Lightbulb,
      title: "Minimizing Disruption: Phased Construction in Active Facilities",
      excerpt: "Strategic approaches to project phasing that maintain operational continuity while delivering on-time, high-quality renovation results.",
      date: "March 8, 2025",
      readTime: "4 min read",
    },
    {
      category: "Education",
      icon: TrendingUp,
      title: "Summer Construction: Maximizing Educational Facility Upgrades",
      excerpt: "How to plan and execute major renovation projects during academic breaks to minimize impact on students and staff while staying on budget.",
      date: "February 28, 2025",
      readTime: "6 min read",
    },
  ];

  const caseStudies = [
    {
      title: "Regional Medical Center ICU Expansion",
      industry: "Healthcare",
      challenge: "Complete 8,000 sq ft ICU renovation in occupied hospital wing without patient relocation",
      solution: "Phased ICRA-compliant construction with 24/7 infection control monitoring and strategic containment",
      result: "100% on-time delivery, zero operational disruptions, full regulatory compliance",
    },
    {
      title: "University Science Building Modernization",
      industry: "Education",
      challenge: "Upgrade 20,000 sq ft lab space during academic year with ongoing classes in adjacent areas",
      solution: "Night and weekend construction schedule with comprehensive safety protocols and dust control",
      result: "Project completed during intersession, minimal class disruption, under budget",
    },
    {
      title: "Multi-Tenant Office Building Renovation",
      industry: "Commercial",
      challenge: "Modernize common areas and tenant spaces while maintaining full building operations",
      solution: "Rolling phased approach with flexible scheduling and proactive tenant communication",
      result: "All tenants retained, positive feedback, 98% satisfaction rating",
    },
  ];

  const resources = [
    {
      title: "ICRA Certification Guide",
      description: "Comprehensive overview of infection control requirements for healthcare construction",
      type: "Whitepaper",
    },
    {
      title: "Project Planning Checklist",
      description: "Essential steps for planning compliant renovations in sensitive environments",
      type: "Resource",
    },
    {
      title: "Regulatory Compliance Matrix",
      description: "Key regulations and standards for healthcare, education, and commercial projects",
      type: "Guide",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Insights & Resources</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Expert knowledge, case studies, and best practices for compliant renovations in sensitive environments.
          </p>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="mb-4 uppercase">Latest Articles</h2>
            <p className="text-muted-foreground text-lg">
              Industry insights and practical guidance from our construction experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.title} className="rounded-none overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-none bg-secondary/10 flex items-center justify-center">
                      <article.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-secondary">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold uppercase mb-3 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <button className="flex items-center gap-2 text-sm font-heading font-semibold uppercase text-secondary hover:gap-4 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="mb-4 uppercase">Case Studies</h2>
            <p className="text-muted-foreground text-lg">
              Real projects, real results—see how we deliver compliant renovations in challenging environments
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study) => (
              <Card key={study.title} className="p-8 rounded-none hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-secondary px-3 py-1 bg-secondary/10 rounded-none">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-semibold uppercase mb-6">
                      {study.title}
                    </h3>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-heading font-semibold uppercase text-secondary mb-2">Challenge</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-heading font-semibold uppercase text-secondary mb-2">Solution</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-heading font-semibold uppercase text-secondary mb-2">Result</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {study.result}
                    </p>
                  </div>
                  
                  <div className="flex items-end">
                    <Link 
                      to="/projects" 
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold uppercase text-secondary hover:gap-4 transition-all"
                    >
                      View All Projects
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="mb-4 uppercase">Resources & Downloads</h2>
            <p className="text-muted-foreground text-lg">
              Practical tools and guides for planning your next renovation project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Card key={resource.title} className="p-6 rounded-none hover:shadow-xl transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-none bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-heading font-semibold uppercase tracking-wider text-secondary mb-2">
                      {resource.type}
                    </div>
                    <h3 className="text-lg font-heading font-semibold uppercase mb-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm font-heading font-semibold uppercase text-secondary hover:gap-4 transition-all">
                      Download
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center max-w-3xl">
          <h2 className="mb-4 uppercase text-white">Stay Informed</h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            Subscribe to receive industry insights, project updates, and best practices for compliant renovations.
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-secondary"
            />
            <Button 
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="px-8"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default Insights;
