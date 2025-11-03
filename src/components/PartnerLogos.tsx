import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Logo {
  name: string;
  image: string;
  alt: string;
  url?: string;
  priority?: number;
}

const logos: Logo[] = [
  {
    name: "Mercy Health",
    image: "/assets/partners/mercy-health.png",
    alt: "Mercy Health - Healthcare Partner",
    url: "https://www.mercy.com/",
    priority: 1
  },
  {
    name: "UC Health",
    image: "/assets/partners/uc-health.png",
    alt: "UC Health - Healthcare Partner",
    url: "https://www.uchealth.com/",
    priority: 2
  },
  {
    name: "Big Boy",
    image: "/assets/partners/big-boy.png",
    alt: "Big Boy - Retail Partner",
    url: "https://www.bigboy.com/",
    priority: 3
  },
  {
    name: "Cushman & Wakefield",
    image: "/assets/partners/cushman-wakefield.png",
    alt: "Cushman & Wakefield - Commercial Real Estate Partner",
    url: "https://www.cushmanwakefield.com/",
    priority: 4
  }
];

const PartnerLogos = () => {
  const useCarousel = logos.length > 8;

  const LogoCard = ({ logo }: { logo: Logo }) => {
    const content = (
      <div className="flex items-center justify-center p-6 md:p-8 rounded-none hover:shadow-md transition-shadow duration-300">
        <img
          src={logo.image}
          alt={logo.alt}
          className="hover:grayscale hover:opacity-70 transition-all duration-300 h-[clamp(50px,6vw,70px)] w-auto max-w-[180px] md:max-w-[220px]"
          loading="lazy"
        />
      </div>
    );

    if (logo.url) {
      return (
        <a
          href={logo.url}
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
      className="py-14 md:py-16 bg-[#F2F2F2]"
      aria-label="Client and partner logos"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide text-center text-charcoal mb-4">
          Trusted by leading organizations
        </h2>
        <p className="text-center text-charcoal/80 text-lg md:text-xl mb-12">
          Healthcare • Education • Retail • Commercial
        </p>

        {useCarousel ? (
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {logos
                .sort((a, b) => (a.priority || 999) - (b.priority || 999))
                .map((logo) => (
                  <CarouselItem 
                    key={logo.name} 
                    className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/6"
                  >
                    <LogoCard logo={logo} />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center max-w-6xl mx-auto">
            {logos
              .sort((a, b) => (a.priority || 999) - (b.priority || 999))
              .map((logo) => (
                <LogoCard key={logo.name} logo={logo} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerLogos;
