import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { usePartnerLogos } from "@/hooks/useCMSContent";
import PageContainer from "@/components/PageContainer";

const PartnerLogos = () => {
  const { data: logos, isLoading } = usePartnerLogos();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-light-grey" aria-label="Client and partner logos">
        <PageContainer>
          <div className="text-center text-charcoal">Loading partners...</div>
        </PageContainer>
      </section>
    );
  }

  if (!logos || logos.length === 0) {
    return null;
  }

  const LogoCard = ({ logo }: { logo: any }) => {
    const content = (
      <div className="flex items-center justify-center p-6 md:p-8 rounded-none hover:shadow-md transition-shadow duration-300">
        <img
          src={logo.image_url}
          alt={logo.alt_text}
          className="hover:grayscale hover:opacity-70 transition-all duration-300 h-[clamp(50px,6vw,70px)] w-auto max-w-[180px] md:max-w-[220px]"
          loading="lazy"
        />
      </div>
    );

    if (logo.website_url) {
      return (
        <a
          href={logo.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`Visit ${logo.name} website`}
        >
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <section 
      className="py-16 md:py-24 bg-light-grey"
      aria-label="Client and partner logos"
    >
      <PageContainer>
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide text-center text-charcoal mb-3">
          Trusted by leading organizations
        </h2>
        <p className="text-center text-charcoal/80 text-lg md:text-xl mb-8 md:mb-10">
          Healthcare • Professional • Retail • Commercial
        </p>

        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {logos.map((logo) => (
              <CarouselItem 
                key={logo.id} 
                className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <LogoCard logo={logo} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </PageContainer>
    </section>
  );
};

export default PartnerLogos;
