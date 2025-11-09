import { useParams, Link } from "react-router-dom";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { useProjects } from "@/hooks/useCMSContent";
import { getValidatedContent, isValidArray } from "@/lib/contentValidation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import ProjectTestimonial from "@/components/ProjectTestimonial";
import ContentComingSoon from "@/components/ContentComingSoon";
import CTASection from "@/components/CTASection";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  AlertCircle, 
  Lightbulb, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Building, 
  Building2,
  Tag as TagIcon, 
  Briefcase, 
  Check 
} from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProjectDetail(slug || "");
  const { data: allProjects = [] } = useProjects();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 lg:px-20">
            <Skeleton className="h-12 w-3/4 mb-8" />
            <Skeleton className="h-64 w-full mb-12" />
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Header />
        <div className="pt-32 pb-24 text-center">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="text-4xl font-heading font-bold text-primary mb-6 uppercase tracking-wide">
              Project Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center text-secondary hover:underline uppercase tracking-wider"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get related projects (same industry, exclude current)
  const relatedProjects = allProjects
    .filter((p: any) => p.industry === project.industry && p.id !== project.id)
    .slice(0, 3);

  // Validate content quality
  const validDescription = getValidatedContent(project.description);
  const validChallenges = getValidatedContent(project.challenges);
  const validSolutions = getValidatedContent(project.solutions);
  const validOutcomes = getValidatedContent(project.outcomes);
  const validKeyFeatures = isValidArray(project.key_features);
  const hasValidTestimonial = 
    getValidatedContent(project.testimonial_quote) && 
    getValidatedContent(project.testimonial_author) && 
    getValidatedContent(project.testimonial_title);

  return (
    <>
      <Header />

      {/* Hero Section with Large Background Image */}
      <section 
        className="relative min-h-[60vh] flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${project.image_url})` }}
      >
        {/* Navy Overlay */}
        <div className="absolute inset-0 bg-primary/70"></div>
        
        {/* Content */}
        <div className="relative z-10 w-full pb-12 pt-32">
          <div className="container mx-auto px-6 lg:px-20">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-white/90 hover:text-white">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/projects" className="text-white/90 hover:text-white">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-semibold">{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide max-w-4xl">
              {project.title}
            </h1>
            
            <Badge variant="secondary" className="text-sm md:text-base uppercase tracking-wider rounded-none px-6 py-2">
              {project.industry}
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12 max-w-full">
              {/* Project Overview */}
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-6 uppercase tracking-wide">
                  Project Overview
                </h2>
                {validDescription ? (
                  <div className="prose prose-lg max-w-none space-y-6">
                    {/* Narrative Introduction */}
                    <p className="text-lg text-charcoal leading-relaxed max-w-[65ch] font-body">
                      {project.detailed_description || 
                        `When ${project.client_name || "our client"} approached us for their ${project.industry.toLowerCase()} project${project.location ? ` in ${project.location}` : ""}, they needed a trusted partner who could deliver exceptional results on time and within budget. This ${project.square_footage ? `${project.square_footage.toLocaleString()} square foot` : ""} ${project.project_type?.toLowerCase() || "construction"} project exemplifies our commitment to building lasting relationships while executing complex construction challenges with precision and expertise.`
                      }
                    </p>
                    
                    {/* Technical Details - bullet points flow naturally */}
                    <p className="text-base text-muted-foreground leading-[1.8] tracking-[0.01em] max-w-[65ch] whitespace-pre-line">
                      {validDescription}
                    </p>
                  </div>
                ) : (
                  <ContentComingSoon />
                )}
              </div>

              {/* The Challenge */}
              {validChallenges ? (
                <Card className="bg-light-grey border-none rounded-none shadow-none">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <AlertCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                      <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary uppercase tracking-wide">
                        The Challenge
                      </h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-base text-muted-foreground leading-[1.8] tracking-[0.01em] max-w-[65ch] whitespace-pre-line">
                        {validChallenges}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {/* Our Solution */}
              {validSolutions ? (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <Lightbulb className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary uppercase tracking-wide">
                      Our Solution
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-base text-muted-foreground leading-[1.8] tracking-[0.01em] max-w-[65ch] whitespace-pre-line">
                      {validSolutions}
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Results & Outcomes */}
              {validOutcomes ? (
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary uppercase tracking-wide">
                      Results & Outcomes
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <div className="grid md:grid-cols-2 gap-4">
                      {validOutcomes.split('\n').filter(line => line.trim()).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                          <p className="text-base text-muted-foreground leading-[1.8] tracking-[0.01em]">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Project Images */}
              {project.project_images && project.project_images.length > 0 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-6 uppercase tracking-wide">
                    Project Gallery
                  </h2>
                  <ProjectImageGallery 
                    images={project.project_images}
                    primaryImage={project.image_url}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Quick Facts Card */}
                <Card className="sticky top-32 bg-white shadow-lg rounded-none border-none">
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-primary mb-6 uppercase tracking-wide">
                        Quick Facts
                      </h3>
                      <div className="space-y-4">
                        {project.square_footage && (
                          <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Square Footage</div>
                              <div className="text-muted-foreground">{project.square_footage.toLocaleString()} SF</div>
                            </div>
                          </div>
                        )}
                        {project.location && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Location</div>
                              <div className="text-muted-foreground">{project.location}</div>
                            </div>
                          </div>
                        )}
                        {project.completion_date && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Completion</div>
                              <div className="text-muted-foreground">
                                {new Date(project.completion_date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                        {project.client_name && (
                          <div className="flex items-start gap-3">
                            <Building className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Client</div>
                              <div className="text-muted-foreground">{project.client_name}</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <TagIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-primary uppercase tracking-wide">Industry</div>
                            <div className="text-muted-foreground">{project.industry}</div>
                          </div>
                        </div>
                        {project.project_type && (
                          <div className="flex items-start gap-3">
                            <Briefcase className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-semibold text-primary uppercase tracking-wide">Project Type</div>
                              <div className="text-muted-foreground">{project.project_type}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key Features */}
                    {validKeyFeatures && (
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-heading font-semibold text-primary mb-4 uppercase tracking-wide">
                          Key Features
                        </h3>
                        <div className="space-y-3">
                          {project.key_features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground text-sm leading-[1.7]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Projects */}
                    {relatedProjects && relatedProjects.length > 0 && (
                      <div className="pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-heading font-semibold text-primary mb-4 uppercase tracking-wide">
                          Related Projects
                        </h3>
                        <div className="space-y-4">
                          {relatedProjects.slice(0, 2).map((relatedProject) => (
                            <Link
                              key={relatedProject.id}
                              to={`/projects/${relatedProject.slug}`}
                              className="block group"
                            >
                              <div className="relative overflow-hidden rounded-none mb-2">
                                <img
                                  src={relatedProject.image_url}
                                  alt={relatedProject.title}
                                  className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              <h4 className="text-sm font-heading font-semibold text-primary group-hover:text-gold transition-colors uppercase tracking-wide">
                                {relatedProject.title}
                              </h4>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      {hasValidTestimonial && (
        <ProjectTestimonial
          quote={project.testimonial_quote!}
          author={project.testimonial_author!}
          title={project.testimonial_title!}
        />
      )}

      {/* More Projects from Same Industry */}
      {relatedProjects && relatedProjects.length > 2 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12 uppercase tracking-wide text-center">
              More {project.industry} Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.slice(0, 3).map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/projects/${relatedProject.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden rounded-none border-none shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={relatedProject.image_url}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-primary mb-2 uppercase tracking-wide group-hover:text-gold transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </>
  );
};

export default ProjectDetail;
