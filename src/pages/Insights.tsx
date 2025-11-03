import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight, FileText, Lightbulb, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useArticles, useCaseStudies, useResources } from "@/hooks/useCMSContent";
import { format } from "date-fns";

// Helper function to map category to icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Healthcare":
      return FileText;
    case "Best Practices":
      return Lightbulb;
    case "Professional":
      return TrendingUp;
    default:
      return FileText;
  }
};

const Insights = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: articles = [], isLoading: articlesLoading } = useArticles();
  const { data: caseStudies = [], isLoading: casesLoading } = useCaseStudies();
  const { data: resources = [], isLoading: resourcesLoading } = useResources();

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
            {articlesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="rounded-none overflow-hidden">
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-10 w-10 rounded-none" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              ))
            ) : articles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No articles available yet.</p>
              </div>
            ) : (
              articles.map((article) => {
                const IconComponent = getCategoryIcon(article.category);
                return (
                  <Card key={article.id} className="rounded-none overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-none bg-secondary/10 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-secondary" />
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
                          <span>{format(new Date(article.date), 'MMMM d, yyyy')}</span>
                        </div>
                        <span>{article.read_time}</span>
                      </div>
                      
                      <button className="flex items-center gap-2 text-sm font-heading font-semibold uppercase text-secondary hover:gap-4 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                );
              })
            )}
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
            {casesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-8 rounded-none">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-6" />
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </Card>
              ))
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No case studies available yet.</p>
              </div>
            ) : (
              caseStudies.map((study) => (
                <Card key={study.id} className="p-8 rounded-none hover:shadow-xl transition-shadow">
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
              ))
            )}
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
            {resourcesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6 rounded-none">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-none flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                </Card>
              ))
            ) : resources.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No resources available yet.</p>
              </div>
            ) : (
              resources.map((resource) => (
                <Card key={resource.id} className="p-6 rounded-none hover:shadow-xl transition-shadow group">
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
              ))
            )}
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
